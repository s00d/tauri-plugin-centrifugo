#!/usr/bin/env node

/**
 * Скрипт для отправки сообщений в канал info каждые 5 секунд
 * Использует gRPC API Centrifugo для публикации
 * Совместим с Centrifugo v5
 */

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

// Конфигурация
const GRPC_PORT = 10001;
const GRPC_HOST = 'localhost';
const CHANNEL = 'info';
const INTERVAL_MS = 5000; // 5 секунд

interface PublishRequest {
  channel: string;
  data: Buffer;
}

interface PublishResponse {
  error?: {
    code: number;
    message: string;
  };
  result?: any;
}

// Глобальные переменные
let messageCounter = 0;
let grpcClient: any = null;

/**
 * Инициализация gRPC клиента
 */
function initGrpcClient(): boolean {
  try {
    // Путь к proto файлу Centrifugo (используем process.cwd() вместо __dirname)
    const protoPath = path.join(process.cwd(), 'proto', 'api.proto');
    
    console.log(`📁 Загружаем proto файл: ${protoPath}`);
    
    // Загружаем proto файл
    const packageDefinition = protoLoader.loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });
    
    // Получаем сервис CentrifugoApi (как в рабочем примере)
    const centrifugoProto = (grpc.loadPackageDefinition(packageDefinition) as any).centrifugal.centrifugo.api;
  
    
    // Создаем gRPC клиент с правильными опциями
    const channelOptions = {
      'grpc.keepalive_time_ms': 6 * 60 * 1000,
      'grpc.keepalive_timeout_ms': 5 * 1000,
      'grpc.keepalive_permit_without_calls': 1,
    };
    
    grpcClient = new centrifugoProto.CentrifugoApi(
      `${GRPC_HOST}:${GRPC_PORT}`,
      grpc.credentials.createInsecure(),
      channelOptions
    );

    console.log(`🔌 gRPC клиент инициализирован для ${GRPC_HOST}:${GRPC_PORT}`);
    return true;
  } catch (error) {
    console.error('❌ Ошибка инициализации gRPC клиента:', (error as Error).message);
    console.error('🔍 Stack trace:', (error as Error).stack);
    return false;
  }
}

/**
 * Отправляет сообщение в канал через gRPC API
 */
async function sendMessage(): Promise<PublishResponse> {
  try {
    if (!grpcClient) {
      throw new Error('gRPC клиент не инициализирован');
    }

    messageCounter++;
    
    // Создаем данные сообщения (как в примере из документации)
    const messageData = {
      type: CHANNEL,
      timestamp: new Date().toISOString(),
      nodeVersion: process.version
    };

    // Создаем публикацию через gRPC (только channel и data)
    const publishRequest: PublishRequest = {
      channel: CHANNEL,
      data: Buffer.from(JSON.stringify(messageData))
    };

    // Отправляем через gRPC (как в рабочем примере)
    return new Promise<PublishResponse>((resolve, reject) => {
      grpcClient.publish(publishRequest, (error: grpc.ServiceError | null, response: PublishResponse) => {
        if (error) {
          // gRPC транспортный уровень ошибки
          console.error('❌ gRPC Transport Error:', error.code, error.details);
          reject(new Error(`gRPC Error: ${error.code} - ${error.details}`));
          return;
        }

        if (response.error && response.error.code) {
          // Centrifugo API уровень ошибки
          console.error('❌ Centrifugo API Error:', response.error.code, response.error.message);
          reject(new Error(`Centrifugo Error: ${response.error.code} - ${response.error.message}`));
          return;
        }

        resolve(response);
      });
    });
    
  } catch (error) {
    throw error;
  }
}

/**
 * Основная функция
 */
async function main(): Promise<void> {
  console.log('🚀 Запуск скрипта отправки сообщений в Centrifugo v5 через gRPC');
  console.log(`📍 gRPC Host: ${GRPC_HOST}:${GRPC_PORT}`);
  console.log(`📡 Канал: ${CHANNEL}`);
  console.log(`⏱️  Интервал: ${INTERVAL_MS / 1000} секунд`);
  console.log('---');

  // Инициализируем gRPC клиент
  if (!initGrpcClient()) {
    console.error('💥 Не удалось инициализировать gRPC клиент. Завершение работы.');
    process.exit(1);
  }

  // Функция для отправки сообщения с обработкой ошибок
  async function sendMessageWithLogging(): Promise<void> {
    try {
      const result = await sendMessage();
      console.log(`[${new Date().toLocaleTimeString()}] ✅ Сообщение #${messageCounter} отправлено в канал ${CHANNEL}`);
      console.log(`   📡 Результат:`, JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(`[${new Date().toLocaleTimeString()}] ❌ Ошибка отправки сообщения #${messageCounter}:`, (error as Error).message);
      
      if ((error as Error).message.includes('14')) {
        console.error('   🔌 Не удается подключиться к gRPC серверу. Убедитесь, что Centrifugo запущен с gRPC API на порту 10000');
      } else if ((error as Error).message.includes('UNAVAILABLE')) {
        console.error('   🔌 gRPC сервер недоступен. Проверьте конфигурацию Centrifugo');
      } else if ((error as Error).message.includes('PERMISSION_DENIED')) {
        console.error('   🔑 Ошибка авторизации gRPC. Проверьте настройки безопасности');
      } else if ((error as Error).message.includes('NOT_FOUND')) {
        console.error('   📁 Канал не найден. Проверьте название канала');
      }
    }
  }

  // Отправляем первое сообщение сразу
  await sendMessageWithLogging();

  // Устанавливаем интервал для отправки сообщений
  const intervalId = setInterval(sendMessageWithLogging, INTERVAL_MS);

  // Обработка сигналов завершения
  process.on('SIGINT', () => {
    console.log('\n🛑 Получен сигнал SIGINT, завершение работы...');
    clearInterval(intervalId);
    if (grpcClient) {
      grpcClient.close();
    }
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Получен сигнал SIGTERM, завершение работы...');
    clearInterval(intervalId);
    if (grpcClient) {
      grpcClient.close();
    }
    process.exit(0);
  });

  console.log('📝 Скрипт запущен. Нажмите Ctrl+C для остановки.');
}

// Запуск скрипта
main().catch((error: Error) => {
  console.error('💥 Критическая ошибка:', error);
  if (grpcClient) {
    grpcClient.close();
  }
  process.exit(1);
});
