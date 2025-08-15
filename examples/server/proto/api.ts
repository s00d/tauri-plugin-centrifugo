/* eslint-disable */
import { ChannelCredentials, Client, makeGenericClientConstructor, Metadata } from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "centrifugal.centrifugo.api";

export interface Command {
  id: number;
  method: Command_MethodType;
  params: Uint8Array;
  publish: PublishRequest | undefined;
  broadcast: BroadcastRequest | undefined;
  subscribe: SubscribeRequest | undefined;
  unsubscribe: UnsubscribeRequest | undefined;
  disconnect: DisconnectRequest | undefined;
  presence: PresenceRequest | undefined;
  presenceStats: PresenceStatsRequest | undefined;
  history: HistoryRequest | undefined;
  historyRemove: HistoryRemoveRequest | undefined;
  info: InfoRequest | undefined;
  rpc: RPCRequest | undefined;
  refresh: RefreshRequest | undefined;
  channels: ChannelsRequest | undefined;
  connections: ConnectionsRequest | undefined;
  updateUserStatus: UpdateUserStatusRequest | undefined;
  getUserStatus: GetUserStatusRequest | undefined;
  deleteUserStatus: DeleteUserStatusRequest | undefined;
  blockUser: BlockUserRequest | undefined;
  unblockUser: UnblockUserRequest | undefined;
  revokeToken: RevokeTokenRequest | undefined;
  invalidateUserTokens: InvalidateUserTokensRequest | undefined;
  deviceRegister: DeviceRegisterRequest | undefined;
  deviceUpdate: DeviceUpdateRequest | undefined;
  deviceRemove: DeviceRemoveRequest | undefined;
  deviceList: DeviceListRequest | undefined;
  deviceTopicList: DeviceTopicListRequest | undefined;
  deviceTopicUpdate: DeviceTopicUpdateRequest | undefined;
  userTopicList: UserTopicListRequest | undefined;
  userTopicUpdate: UserTopicUpdateRequest | undefined;
  sendPushNotification: SendPushNotificationRequest | undefined;
  updatePushStatus: UpdatePushStatusRequest | undefined;
  cancelPush: CancelPushRequest | undefined;
}

export enum Command_MethodType {
  PUBLISH = 0,
  BROADCAST = 1,
  UNSUBSCRIBE = 2,
  DISCONNECT = 3,
  PRESENCE = 4,
  PRESENCE_STATS = 5,
  HISTORY = 6,
  HISTORY_REMOVE = 7,
  CHANNELS = 8,
  INFO = 9,
  RPC = 10,
  SUBSCRIBE = 11,
  REFRESH = 12,
  CONNECTIONS = 14,
  UPDATE_USER_STATUS = 15,
  GET_USER_STATUS = 16,
  DELETE_USER_STATUS = 17,
  BLOCK_USER = 18,
  UNBLOCK_USER = 19,
  REVOKE_TOKEN = 20,
  INVALIDATE_USER_TOKENS = 21,
  DEVICE_REGISTER = 22,
  DEVICE_UPDATE = 23,
  DEVICE_REMOVE = 24,
  DEVICE_LIST = 25,
  DEVICE_TOPIC_LIST = 26,
  DEVICE_TOPIC_UPDATE = 27,
  USER_TOPIC_LIST = 28,
  USER_TOPIC_UPDATE = 29,
  SEND_PUSH_NOTIFICATION = 30,
  UPDATE_PUSH_STATUS = 31,
  CANCEL_PUSH = 32,
  UNRECOGNIZED = -1,
}

export function command_MethodTypeFromJSON(object: any): Command_MethodType {
  switch (object) {
    case 0:
    case "PUBLISH":
      return Command_MethodType.PUBLISH;
    case 1:
    case "BROADCAST":
      return Command_MethodType.BROADCAST;
    case 2:
    case "UNSUBSCRIBE":
      return Command_MethodType.UNSUBSCRIBE;
    case 3:
    case "DISCONNECT":
      return Command_MethodType.DISCONNECT;
    case 4:
    case "PRESENCE":
      return Command_MethodType.PRESENCE;
    case 5:
    case "PRESENCE_STATS":
      return Command_MethodType.PRESENCE_STATS;
    case 6:
    case "HISTORY":
      return Command_MethodType.HISTORY;
    case 7:
    case "HISTORY_REMOVE":
      return Command_MethodType.HISTORY_REMOVE;
    case 8:
    case "CHANNELS":
      return Command_MethodType.CHANNELS;
    case 9:
    case "INFO":
      return Command_MethodType.INFO;
    case 10:
    case "RPC":
      return Command_MethodType.RPC;
    case 11:
    case "SUBSCRIBE":
      return Command_MethodType.SUBSCRIBE;
    case 12:
    case "REFRESH":
      return Command_MethodType.REFRESH;
    case 14:
    case "CONNECTIONS":
      return Command_MethodType.CONNECTIONS;
    case 15:
    case "UPDATE_USER_STATUS":
      return Command_MethodType.UPDATE_USER_STATUS;
    case 16:
    case "GET_USER_STATUS":
      return Command_MethodType.GET_USER_STATUS;
    case 17:
    case "DELETE_USER_STATUS":
      return Command_MethodType.DELETE_USER_STATUS;
    case 18:
    case "BLOCK_USER":
      return Command_MethodType.BLOCK_USER;
    case 19:
    case "UNBLOCK_USER":
      return Command_MethodType.UNBLOCK_USER;
    case 20:
    case "REVOKE_TOKEN":
      return Command_MethodType.REVOKE_TOKEN;
    case 21:
    case "INVALIDATE_USER_TOKENS":
      return Command_MethodType.INVALIDATE_USER_TOKENS;
    case 22:
    case "DEVICE_REGISTER":
      return Command_MethodType.DEVICE_REGISTER;
    case 23:
    case "DEVICE_UPDATE":
      return Command_MethodType.DEVICE_UPDATE;
    case 24:
    case "DEVICE_REMOVE":
      return Command_MethodType.DEVICE_REMOVE;
    case 25:
    case "DEVICE_LIST":
      return Command_MethodType.DEVICE_LIST;
    case 26:
    case "DEVICE_TOPIC_LIST":
      return Command_MethodType.DEVICE_TOPIC_LIST;
    case 27:
    case "DEVICE_TOPIC_UPDATE":
      return Command_MethodType.DEVICE_TOPIC_UPDATE;
    case 28:
    case "USER_TOPIC_LIST":
      return Command_MethodType.USER_TOPIC_LIST;
    case 29:
    case "USER_TOPIC_UPDATE":
      return Command_MethodType.USER_TOPIC_UPDATE;
    case 30:
    case "SEND_PUSH_NOTIFICATION":
      return Command_MethodType.SEND_PUSH_NOTIFICATION;
    case 31:
    case "UPDATE_PUSH_STATUS":
      return Command_MethodType.UPDATE_PUSH_STATUS;
    case 32:
    case "CANCEL_PUSH":
      return Command_MethodType.CANCEL_PUSH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Command_MethodType.UNRECOGNIZED;
  }
}

export function command_MethodTypeToJSON(object: Command_MethodType): string {
  switch (object) {
    case Command_MethodType.PUBLISH:
      return "PUBLISH";
    case Command_MethodType.BROADCAST:
      return "BROADCAST";
    case Command_MethodType.UNSUBSCRIBE:
      return "UNSUBSCRIBE";
    case Command_MethodType.DISCONNECT:
      return "DISCONNECT";
    case Command_MethodType.PRESENCE:
      return "PRESENCE";
    case Command_MethodType.PRESENCE_STATS:
      return "PRESENCE_STATS";
    case Command_MethodType.HISTORY:
      return "HISTORY";
    case Command_MethodType.HISTORY_REMOVE:
      return "HISTORY_REMOVE";
    case Command_MethodType.CHANNELS:
      return "CHANNELS";
    case Command_MethodType.INFO:
      return "INFO";
    case Command_MethodType.RPC:
      return "RPC";
    case Command_MethodType.SUBSCRIBE:
      return "SUBSCRIBE";
    case Command_MethodType.REFRESH:
      return "REFRESH";
    case Command_MethodType.CONNECTIONS:
      return "CONNECTIONS";
    case Command_MethodType.UPDATE_USER_STATUS:
      return "UPDATE_USER_STATUS";
    case Command_MethodType.GET_USER_STATUS:
      return "GET_USER_STATUS";
    case Command_MethodType.DELETE_USER_STATUS:
      return "DELETE_USER_STATUS";
    case Command_MethodType.BLOCK_USER:
      return "BLOCK_USER";
    case Command_MethodType.UNBLOCK_USER:
      return "UNBLOCK_USER";
    case Command_MethodType.REVOKE_TOKEN:
      return "REVOKE_TOKEN";
    case Command_MethodType.INVALIDATE_USER_TOKENS:
      return "INVALIDATE_USER_TOKENS";
    case Command_MethodType.DEVICE_REGISTER:
      return "DEVICE_REGISTER";
    case Command_MethodType.DEVICE_UPDATE:
      return "DEVICE_UPDATE";
    case Command_MethodType.DEVICE_REMOVE:
      return "DEVICE_REMOVE";
    case Command_MethodType.DEVICE_LIST:
      return "DEVICE_LIST";
    case Command_MethodType.DEVICE_TOPIC_LIST:
      return "DEVICE_TOPIC_LIST";
    case Command_MethodType.DEVICE_TOPIC_UPDATE:
      return "DEVICE_TOPIC_UPDATE";
    case Command_MethodType.USER_TOPIC_LIST:
      return "USER_TOPIC_LIST";
    case Command_MethodType.USER_TOPIC_UPDATE:
      return "USER_TOPIC_UPDATE";
    case Command_MethodType.SEND_PUSH_NOTIFICATION:
      return "SEND_PUSH_NOTIFICATION";
    case Command_MethodType.UPDATE_PUSH_STATUS:
      return "UPDATE_PUSH_STATUS";
    case Command_MethodType.CANCEL_PUSH:
      return "CANCEL_PUSH";
    case Command_MethodType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Error {
  code: number;
  message: string;
}

export interface Reply {
  id: number;
  error: Error | undefined;
  result: Uint8Array;
  publish: PublishResult | undefined;
  broadcast: BroadcastResult | undefined;
  subscribe: SubscribeResult | undefined;
  unsubscribe: UnsubscribeResult | undefined;
  disconnect: DisconnectResult | undefined;
  presence: PresenceResult | undefined;
  presenceStats: PresenceStatsResult | undefined;
  history: HistoryResult | undefined;
  historyRemove: HistoryRemoveResult | undefined;
  info: InfoResult | undefined;
  rpc: RPCResult | undefined;
  refresh: RefreshResult | undefined;
  channels: ChannelsResult | undefined;
  connections: ConnectionsResult | undefined;
  updateUserStatus: UpdateUserStatusResult | undefined;
  getUserStatus: GetUserStatusResult | undefined;
  deleteUserStatus: DeleteUserStatusResult | undefined;
  blockUser: BlockUserResult | undefined;
  unblockUser: UnblockUserResult | undefined;
  revokeToken: RevokeTokenResult | undefined;
  invalidateUserTokens: InvalidateUserTokensResult | undefined;
  deviceRegister: DeviceRegisterResult | undefined;
  deviceUpdate: DeviceUpdateResult | undefined;
  deviceRemove: DeviceRemoveResult | undefined;
  deviceList: DeviceListResult | undefined;
  deviceTopicList: DeviceTopicListResult | undefined;
  deviceTopicUpdate: DeviceTopicUpdateResult | undefined;
  userTopicList: UserTopicListResult | undefined;
  userTopicUpdate: UserTopicUpdateResult | undefined;
  sendPushNotification: SendPushNotificationResult | undefined;
  updatePushStatus: UpdatePushStatusResult | undefined;
  cancelPush: CancelPushResult | undefined;
}

export interface BoolValue {
  value: boolean;
}

export interface Int32Value {
  value: number;
}

export interface SubscribeOptionOverride {
  presence: BoolValue | undefined;
  joinLeave: BoolValue | undefined;
  forceRecovery: BoolValue | undefined;
  forcePositioning: BoolValue | undefined;
  forcePushJoinLeave: BoolValue | undefined;
}

export interface BatchRequest {
  commands: Command[];
  parallel: boolean;
}

export interface BatchResponse {
  replies: Reply[];
}

export interface PublishRequest {
  channel: string;
  data: Uint8Array;
  b64data: string;
  skipHistory: boolean;
  tags: { [key: string]: string };
  idempotencyKey: string;
}

export interface PublishRequest_TagsEntry {
  key: string;
  value: string;
}

export interface PublishResponse {
  error: Error | undefined;
  result: PublishResult | undefined;
}

export interface PublishResult {
  offset: number;
  epoch: string;
}

export interface BroadcastRequest {
  channels: string[];
  data: Uint8Array;
  b64data: string;
  skipHistory: boolean;
  tags: { [key: string]: string };
  idempotencyKey: string;
}

export interface BroadcastRequest_TagsEntry {
  key: string;
  value: string;
}

export interface BroadcastResponse {
  error: Error | undefined;
  result: BroadcastResult | undefined;
}

export interface BroadcastResult {
  responses: PublishResponse[];
}

export interface SubscribeRequest {
  channel: string;
  user: string;
  expireAt: number;
  info: Uint8Array;
  b64info: string;
  client: string;
  data: Uint8Array;
  b64data: string;
  recoverSince: StreamPosition | undefined;
  override: SubscribeOptionOverride | undefined;
  session: string;
}

export interface SubscribeResponse {
  error: Error | undefined;
  result: SubscribeResult | undefined;
}

export interface SubscribeResult {
}

export interface UnsubscribeRequest {
  channel: string;
  user: string;
  client: string;
  session: string;
}

export interface UnsubscribeResponse {
  error: Error | undefined;
  result: UnsubscribeResult | undefined;
}

export interface UnsubscribeResult {
}

export interface Disconnect {
  code: number;
  reason: string;
}

export interface DisconnectRequest {
  user: string;
  disconnect: Disconnect | undefined;
  client: string;
  whitelist: string[];
  session: string;
}

export interface DisconnectResponse {
  error: Error | undefined;
  result: DisconnectResult | undefined;
}

export interface DisconnectResult {
}

export interface PresenceRequest {
  channel: string;
}

export interface PresenceResponse {
  error: Error | undefined;
  result: PresenceResult | undefined;
}

export interface ClientInfo {
  user: string;
  client: string;
  connInfo: Uint8Array;
  chanInfo: Uint8Array;
}

export interface PresenceResult {
  presence: { [key: string]: ClientInfo };
}

export interface PresenceResult_PresenceEntry {
  key: string;
  value: ClientInfo | undefined;
}

export interface PresenceStatsRequest {
  channel: string;
}

export interface PresenceStatsResponse {
  error: Error | undefined;
  result: PresenceStatsResult | undefined;
}

export interface PresenceStatsResult {
  numClients: number;
  numUsers: number;
}

export interface StreamPosition {
  offset: number;
  epoch: string;
}

export interface HistoryRequest {
  channel: string;
  limit: number;
  since: StreamPosition | undefined;
  reverse: boolean;
}

export interface HistoryResponse {
  error: Error | undefined;
  result: HistoryResult | undefined;
}

export interface Publication {
  /** Removed: string uid = 1; */
  data: Uint8Array;
  info: ClientInfo | undefined;
  offset: number;
  tags: { [key: string]: string };
}

export interface Publication_TagsEntry {
  key: string;
  value: string;
}

export interface HistoryResult {
  publications: Publication[];
  epoch: string;
  offset: number;
}

export interface HistoryRemoveRequest {
  channel: string;
}

export interface HistoryRemoveResponse {
  error: Error | undefined;
  result: HistoryRemoveResult | undefined;
}

export interface HistoryRemoveResult {
}

export interface InfoRequest {
}

export interface InfoResponse {
  error: Error | undefined;
  result: InfoResult | undefined;
}

export interface InfoResult {
  nodes: NodeResult[];
}

export interface RPCRequest {
  method: string;
  params: Uint8Array;
}

export interface RPCResponse {
  error: Error | undefined;
  result: RPCResult | undefined;
}

export interface RPCResult {
  data: Uint8Array;
}

export interface RefreshRequest {
  user: string;
  client: string;
  expired: boolean;
  expireAt: number;
  info: Uint8Array;
  session: string;
}

export interface RefreshResponse {
  error: Error | undefined;
  result: RefreshResult | undefined;
}

export interface RefreshResult {
}

export interface NodeResult {
  uid: string;
  name: string;
  version: string;
  numClients: number;
  numUsers: number;
  numChannels: number;
  uptime: number;
  metrics: Metrics | undefined;
  process: Process | undefined;
  numSubs: number;
}

export interface Metrics {
  interval: number;
  items: { [key: string]: number };
}

export interface Metrics_ItemsEntry {
  key: string;
  value: number;
}

export interface Process {
  cpu: number;
  rss: number;
}

export interface ChannelsRequest {
  pattern: string;
}

export interface ChannelsResponse {
  error: Error | undefined;
  result: ChannelsResult | undefined;
}

export interface ChannelsResult {
  channels: { [key: string]: ChannelInfo };
}

export interface ChannelsResult_ChannelsEntry {
  key: string;
  value: ChannelInfo | undefined;
}

export interface ChannelInfo {
  numClients: number;
}

export interface ConnectionsRequest {
  user: string;
  expression: string;
}

export interface ConnectionsResponse {
  error: Error | undefined;
  result: ConnectionsResult | undefined;
}

export interface ConnectionsResult {
  connections: { [key: string]: ConnectionInfo };
}

export interface ConnectionsResult_ConnectionsEntry {
  key: string;
  value: ConnectionInfo | undefined;
}

export interface ConnectionInfo {
  appName: string;
  appVersion: string;
  transport: string;
  protocol: string;
  /** 5-7 dropped for backwards compatibility. */
  user: string;
  state: ConnectionState | undefined;
}

export interface ConnectionState {
  channels: { [key: string]: ChannelContext };
  connectionToken: ConnectionTokenInfo | undefined;
  subscriptionTokens: { [key: string]: SubscriptionTokenInfo };
  meta: Uint8Array;
}

export interface ConnectionState_ChannelsEntry {
  key: string;
  value: ChannelContext | undefined;
}

export interface ConnectionState_SubscriptionTokensEntry {
  key: string;
  value: SubscriptionTokenInfo | undefined;
}

export interface ChannelContext {
  source: number;
}

export interface ConnectionTokenInfo {
  uid: string;
  issuedAt: number;
}

export interface SubscriptionTokenInfo {
  uid: string;
  issuedAt: number;
}

export interface UpdateUserStatusRequest {
  users: string[];
  state: string;
}

export interface UpdateUserStatusResponse {
  error: Error | undefined;
  result: UpdateUserStatusResult | undefined;
}

export interface UpdateUserStatusResult {
}

export interface GetUserStatusRequest {
  users: string[];
}

export interface GetUserStatusResponse {
  error: Error | undefined;
  result: GetUserStatusResult | undefined;
}

export interface GetUserStatusResult {
  statuses: UserStatus[];
}

export interface UserStatus {
  user: string;
  active: number;
  online: number;
  state: string;
}

export interface DeleteUserStatusRequest {
  users: string[];
}

export interface DeleteUserStatusResponse {
  error: Error | undefined;
  result: DeleteUserStatusResult | undefined;
}

export interface DeleteUserStatusResult {
}

export interface BlockUserRequest {
  expireAt: number;
  user: string;
}

export interface BlockUserResult {
}

export interface BlockUserResponse {
  error: Error | undefined;
  result: BlockUserResult | undefined;
}

export interface UnblockUserRequest {
  user: string;
}

export interface UnblockUserResult {
}

export interface UnblockUserResponse {
  error: Error | undefined;
  result: UnblockUserResult | undefined;
}

export interface RevokeTokenRequest {
  expireAt: number;
  uid: string;
}

export interface RevokeTokenResult {
}

export interface RevokeTokenResponse {
  error: Error | undefined;
  result: RevokeTokenResult | undefined;
}

export interface InvalidateUserTokensRequest {
  expireAt: number;
  user: string;
  issuedBefore: number;
  channel: string;
}

export interface InvalidateUserTokensResult {
}

export interface InvalidateUserTokensResponse {
  error: Error | undefined;
  result: InvalidateUserTokensResult | undefined;
}

export interface DeviceRegisterRequest {
  id: string;
  provider: string;
  token: string;
  platform: string;
  user: string;
  meta: { [key: string]: string };
  topics: string[];
  timezone: string;
  language: string;
}

export interface DeviceRegisterRequest_MetaEntry {
  key: string;
  value: string;
}

export interface DeviceUpdateRequest {
  ids: string[];
  users: string[];
  userUpdate: DeviceUserUpdate | undefined;
  metaUpdate: DeviceMetaUpdate | undefined;
  topicsUpdate: DeviceTopicsUpdate | undefined;
  timezoneUpdate: DeviceTimezoneUpdate | undefined;
  languageUpdate: DeviceLanguageUpdate | undefined;
}

export interface DeviceRemoveRequest {
  ids: string[];
  users: string[];
}

export interface DeviceUserUpdate {
  user: string;
}

export interface DeviceTimezoneUpdate {
  timezone: string;
}

export interface DeviceLanguageUpdate {
  language: string;
}

export interface DeviceMetaUpdate {
  meta: { [key: string]: string };
}

export interface DeviceMetaUpdate_MetaEntry {
  key: string;
  value: string;
}

export interface DeviceTopicsUpdate {
  /** add | remove | set */
  op: string;
  topics: string[];
}

export interface DeviceFilter {
  ids: string[];
  users: string[];
  topics: string[];
  providers: string[];
  platforms: string[];
}

export interface DeviceListRequest {
  filter: DeviceFilter | undefined;
  includeTotalCount: boolean;
  includeMeta: boolean;
  includeTopics: boolean;
  cursor: string;
  limit: number;
}

export interface DeviceTopicFilter {
  deviceIds: string[];
  deviceProviders: string[];
  devicePlatforms: string[];
  deviceUsers: string[];
  topics: string[];
  topicPrefix: string;
}

export interface DeviceTopicListRequest {
  filter: DeviceTopicFilter | undefined;
  includeTotalCount: boolean;
  includeDevice: boolean;
  cursor: string;
  limit: number;
}

export interface UserTopicFilter {
  users: string[];
  topics: string[];
  topicPrefix: string;
}

export interface UserTopicListRequest {
  filter: UserTopicFilter | undefined;
  includeTotalCount: boolean;
  cursor: string;
  limit: number;
}

export interface DeviceTopicUpdateRequest {
  deviceId: string;
  /** add | remove | set */
  op: string;
  topics: string[];
}

export interface UserTopicUpdateRequest {
  user: string;
  /** add | remove | set */
  op: string;
  topics: string[];
}

export interface DeviceRegisterResponse {
  error: Error | undefined;
  result: DeviceRegisterResult | undefined;
}

export interface DeviceUpdateResponse {
  error: Error | undefined;
  result: DeviceUpdateResult | undefined;
}

export interface DeviceRemoveResponse {
  error: Error | undefined;
  result: DeviceRemoveResult | undefined;
}

export interface DeviceListResponse {
  error: Error | undefined;
  result: DeviceListResult | undefined;
}

export interface DeviceTopicListResponse {
  error: Error | undefined;
  result: DeviceTopicListResult | undefined;
}

export interface UserTopicListResponse {
  error: Error | undefined;
  result: UserTopicListResult | undefined;
}

export interface DeviceTopicUpdateResponse {
  error: Error | undefined;
  result: DeviceTopicUpdateResult | undefined;
}

export interface UserTopicUpdateResponse {
  error: Error | undefined;
  result: UserTopicUpdateResult | undefined;
}

export interface DeviceRegisterResult {
  id: string;
}

export interface DeviceUpdateResult {
}

export interface DeviceRemoveResult {
}

export interface DeviceListResult {
  items: Device[];
  nextCursor: string;
  totalCount: number;
}

export interface Device {
  id: string;
  platform: string;
  provider: string;
  token: string;
  user: string;
  createdAt: number;
  updatedAt: number;
  meta: { [key: string]: string };
  topics: string[];
  timezone: string;
  language: string;
}

export interface Device_MetaEntry {
  key: string;
  value: string;
}

export interface DeviceTopicListResult {
  items: DeviceTopic[];
  nextCursor: string;
  totalCount: number;
}

export interface DeviceTopic {
  id: string;
  topic: string;
  device: Device | undefined;
}

export interface UserTopicListResult {
  items: UserTopic[];
  nextCursor: string;
  totalCount: number;
}

export interface DeviceTopicUpdateResult {
}

export interface UserTopicUpdateResult {
}

export interface UserTopic {
  id: string;
  user: string;
  topic: string;
}

export interface PushRecipient {
  filter: DeviceFilter | undefined;
  fcmTokens: string[];
  fcmTopic: string;
  fcmCondition: string;
  hmsTokens: string[];
  hmsTopic: string;
  hmsCondition: string;
  apnsTokens: string[];
}

export interface PushNotification {
  fcm: FcmPushNotification | undefined;
  hms: HmsPushNotification | undefined;
  apns:
    | ApnsPushNotification
    | undefined;
  /** timestamp in the future when Centrifugo should stop trying to send push notification. */
  expireAt: number;
}

export interface FcmPushNotification {
  message: Uint8Array;
}

export interface HmsPushNotification {
  message: Uint8Array;
}

export interface ApnsPushNotification {
  headers: { [key: string]: string };
  payload: Uint8Array;
}

export interface ApnsPushNotification_HeadersEntry {
  key: string;
  value: string;
}

export interface SendPushNotificationRequest {
  recipient: PushRecipient | undefined;
  notification:
    | PushNotification
    | undefined;
  /** unique identifier for each push notification request, can be used to cancel push. */
  uid: string;
  /** Unix seconds, if set - push will be sent at this time, if not set - immediately. */
  sendAt: number;
  /** makes processing heavier, but tolerates edge cases, like not loosing inflight pushes due to temporary queue unavailability. */
  optimizeForReliability: boolean;
  /** strategy for sending push notifications. Applicable only for pushes with filter recipient. When using this field Centrifugo processes devices one by one. */
  limitStrategy:
    | PushLimitStrategy
    | undefined;
  /** uid for push notification analytics, if not set - Centrifugo will use uid field. */
  analyticsUid: string;
  /** optional per language localizations for push notification. */
  localizations: { [key: string]: PushLocalization };
  /** if set - Centrifugo will use templating for push notification. Note that setting localizations enables templating automatically. */
  useTemplating: boolean;
  /** if set - Centrifugo will additionally load device meta during push sending, this meta becomes available in templating. */
  useMeta: boolean;
}

export interface SendPushNotificationRequest_LocalizationsEntry {
  key: string;
  value: PushLocalization | undefined;
}

export interface PushLocalization {
  /** variable name to value for the specific language. */
  translations: { [key: string]: string };
}

export interface PushLocalization_TranslationsEntry {
  key: string;
  value: string;
}

export interface PushLimitStrategy {
  rateLimit: PushRateLimitStrategy | undefined;
  timeLimit: PushTimeLimitStrategy | undefined;
}

export interface PushTimeLimitStrategy {
  /** HH:MM:SS */
  sendAfterTime: string;
  /** HH:MM:SS */
  sendBeforeTime: string;
  /** If device timezone is not set - send push now, by default will be dropped. */
  noTzSendNow: boolean;
}

export interface PushRateLimitStrategy {
  /** optional key for rate limit policy, supports variables. */
  key: string;
  policies: RateLimitPolicy[];
  dropIfRateLimited: boolean;
}

export interface SendPushNotificationResponse {
  error: Error | undefined;
  result: SendPushNotificationResult | undefined;
}

export interface SendPushNotificationResult {
  /** Unique identifier of notification send request (it's not a FCM message id). */
  uid: string;
}

export interface UpdatePushStatusRequest {
  /** analytics uid of push notification (should match SendPushNotificationRequest.analytics_uid) */
  analyticsUid: string;
  /** delivered | interacted */
  status: string;
  /** Centrifugo device id. */
  deviceId: string;
  /** Provider issued message id. */
  msgId: string;
}

export interface UpdatePushStatusResponse {
  error: Error | undefined;
  result: UpdatePushStatusResult | undefined;
}

export interface UpdatePushStatusResult {
}

export interface CancelPushRequest {
  uid: string;
}

export interface CancelPushResponse {
  error: Error | undefined;
  result: CancelPushResult | undefined;
}

export interface CancelPushResult {
}

export interface RateLimitPolicy {
  rate: number;
  intervalMs: number;
}

export interface RateLimitRequest {
  key: string;
  score: number;
  dryRun: boolean;
  policies: RateLimitPolicy[];
  includePolicyEvaluations: boolean;
}

export interface RateLimitResponse {
  error: Error | undefined;
  result: RateLimitResult | undefined;
}

export interface RateLimitPolicyEvaluation {
  allowed: boolean;
  tokensLeft: number;
  allowedInMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  allowedInMs: number;
  serverTimeMs: number;
  policies: RateLimitPolicyEvaluation[];
}

export interface ResetRateLimitRequest {
  key: string;
}

export interface ResetRateLimitResponse {
  error: Error | undefined;
  result: ResetRateLimitResult | undefined;
}

export interface ResetRateLimitResult {
}

function createBaseCommand(): Command {
  return {
    id: 0,
    method: 0,
    params: new Uint8Array(0),
    publish: undefined,
    broadcast: undefined,
    subscribe: undefined,
    unsubscribe: undefined,
    disconnect: undefined,
    presence: undefined,
    presenceStats: undefined,
    history: undefined,
    historyRemove: undefined,
    info: undefined,
    rpc: undefined,
    refresh: undefined,
    channels: undefined,
    connections: undefined,
    updateUserStatus: undefined,
    getUserStatus: undefined,
    deleteUserStatus: undefined,
    blockUser: undefined,
    unblockUser: undefined,
    revokeToken: undefined,
    invalidateUserTokens: undefined,
    deviceRegister: undefined,
    deviceUpdate: undefined,
    deviceRemove: undefined,
    deviceList: undefined,
    deviceTopicList: undefined,
    deviceTopicUpdate: undefined,
    userTopicList: undefined,
    userTopicUpdate: undefined,
    sendPushNotification: undefined,
    updatePushStatus: undefined,
    cancelPush: undefined,
  };
}

export const Command = {
  encode(message: Command, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.method !== 0) {
      writer.uint32(16).int32(message.method);
    }
    if (message.params.length !== 0) {
      writer.uint32(26).bytes(message.params);
    }
    if (message.publish !== undefined) {
      PublishRequest.encode(message.publish, writer.uint32(34).fork()).ldelim();
    }
    if (message.broadcast !== undefined) {
      BroadcastRequest.encode(message.broadcast, writer.uint32(42).fork()).ldelim();
    }
    if (message.subscribe !== undefined) {
      SubscribeRequest.encode(message.subscribe, writer.uint32(50).fork()).ldelim();
    }
    if (message.unsubscribe !== undefined) {
      UnsubscribeRequest.encode(message.unsubscribe, writer.uint32(58).fork()).ldelim();
    }
    if (message.disconnect !== undefined) {
      DisconnectRequest.encode(message.disconnect, writer.uint32(66).fork()).ldelim();
    }
    if (message.presence !== undefined) {
      PresenceRequest.encode(message.presence, writer.uint32(74).fork()).ldelim();
    }
    if (message.presenceStats !== undefined) {
      PresenceStatsRequest.encode(message.presenceStats, writer.uint32(82).fork()).ldelim();
    }
    if (message.history !== undefined) {
      HistoryRequest.encode(message.history, writer.uint32(90).fork()).ldelim();
    }
    if (message.historyRemove !== undefined) {
      HistoryRemoveRequest.encode(message.historyRemove, writer.uint32(98).fork()).ldelim();
    }
    if (message.info !== undefined) {
      InfoRequest.encode(message.info, writer.uint32(106).fork()).ldelim();
    }
    if (message.rpc !== undefined) {
      RPCRequest.encode(message.rpc, writer.uint32(114).fork()).ldelim();
    }
    if (message.refresh !== undefined) {
      RefreshRequest.encode(message.refresh, writer.uint32(122).fork()).ldelim();
    }
    if (message.channels !== undefined) {
      ChannelsRequest.encode(message.channels, writer.uint32(130).fork()).ldelim();
    }
    if (message.connections !== undefined) {
      ConnectionsRequest.encode(message.connections, writer.uint32(138).fork()).ldelim();
    }
    if (message.updateUserStatus !== undefined) {
      UpdateUserStatusRequest.encode(message.updateUserStatus, writer.uint32(146).fork()).ldelim();
    }
    if (message.getUserStatus !== undefined) {
      GetUserStatusRequest.encode(message.getUserStatus, writer.uint32(154).fork()).ldelim();
    }
    if (message.deleteUserStatus !== undefined) {
      DeleteUserStatusRequest.encode(message.deleteUserStatus, writer.uint32(162).fork()).ldelim();
    }
    if (message.blockUser !== undefined) {
      BlockUserRequest.encode(message.blockUser, writer.uint32(170).fork()).ldelim();
    }
    if (message.unblockUser !== undefined) {
      UnblockUserRequest.encode(message.unblockUser, writer.uint32(178).fork()).ldelim();
    }
    if (message.revokeToken !== undefined) {
      RevokeTokenRequest.encode(message.revokeToken, writer.uint32(186).fork()).ldelim();
    }
    if (message.invalidateUserTokens !== undefined) {
      InvalidateUserTokensRequest.encode(message.invalidateUserTokens, writer.uint32(194).fork()).ldelim();
    }
    if (message.deviceRegister !== undefined) {
      DeviceRegisterRequest.encode(message.deviceRegister, writer.uint32(202).fork()).ldelim();
    }
    if (message.deviceUpdate !== undefined) {
      DeviceUpdateRequest.encode(message.deviceUpdate, writer.uint32(210).fork()).ldelim();
    }
    if (message.deviceRemove !== undefined) {
      DeviceRemoveRequest.encode(message.deviceRemove, writer.uint32(218).fork()).ldelim();
    }
    if (message.deviceList !== undefined) {
      DeviceListRequest.encode(message.deviceList, writer.uint32(226).fork()).ldelim();
    }
    if (message.deviceTopicList !== undefined) {
      DeviceTopicListRequest.encode(message.deviceTopicList, writer.uint32(234).fork()).ldelim();
    }
    if (message.deviceTopicUpdate !== undefined) {
      DeviceTopicUpdateRequest.encode(message.deviceTopicUpdate, writer.uint32(242).fork()).ldelim();
    }
    if (message.userTopicList !== undefined) {
      UserTopicListRequest.encode(message.userTopicList, writer.uint32(250).fork()).ldelim();
    }
    if (message.userTopicUpdate !== undefined) {
      UserTopicUpdateRequest.encode(message.userTopicUpdate, writer.uint32(258).fork()).ldelim();
    }
    if (message.sendPushNotification !== undefined) {
      SendPushNotificationRequest.encode(message.sendPushNotification, writer.uint32(266).fork()).ldelim();
    }
    if (message.updatePushStatus !== undefined) {
      UpdatePushStatusRequest.encode(message.updatePushStatus, writer.uint32(274).fork()).ldelim();
    }
    if (message.cancelPush !== undefined) {
      CancelPushRequest.encode(message.cancelPush, writer.uint32(282).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Command {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.method = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.params = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.publish = PublishRequest.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.broadcast = BroadcastRequest.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.subscribe = SubscribeRequest.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.unsubscribe = UnsubscribeRequest.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.disconnect = DisconnectRequest.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.presence = PresenceRequest.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.presenceStats = PresenceStatsRequest.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.history = HistoryRequest.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.historyRemove = HistoryRemoveRequest.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.info = InfoRequest.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.rpc = RPCRequest.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.refresh = RefreshRequest.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.channels = ChannelsRequest.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.connections = ConnectionsRequest.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.updateUserStatus = UpdateUserStatusRequest.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.getUserStatus = GetUserStatusRequest.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.deleteUserStatus = DeleteUserStatusRequest.decode(reader, reader.uint32());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.blockUser = BlockUserRequest.decode(reader, reader.uint32());
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.unblockUser = UnblockUserRequest.decode(reader, reader.uint32());
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.revokeToken = RevokeTokenRequest.decode(reader, reader.uint32());
          continue;
        case 24:
          if (tag !== 194) {
            break;
          }

          message.invalidateUserTokens = InvalidateUserTokensRequest.decode(reader, reader.uint32());
          continue;
        case 25:
          if (tag !== 202) {
            break;
          }

          message.deviceRegister = DeviceRegisterRequest.decode(reader, reader.uint32());
          continue;
        case 26:
          if (tag !== 210) {
            break;
          }

          message.deviceUpdate = DeviceUpdateRequest.decode(reader, reader.uint32());
          continue;
        case 27:
          if (tag !== 218) {
            break;
          }

          message.deviceRemove = DeviceRemoveRequest.decode(reader, reader.uint32());
          continue;
        case 28:
          if (tag !== 226) {
            break;
          }

          message.deviceList = DeviceListRequest.decode(reader, reader.uint32());
          continue;
        case 29:
          if (tag !== 234) {
            break;
          }

          message.deviceTopicList = DeviceTopicListRequest.decode(reader, reader.uint32());
          continue;
        case 30:
          if (tag !== 242) {
            break;
          }

          message.deviceTopicUpdate = DeviceTopicUpdateRequest.decode(reader, reader.uint32());
          continue;
        case 31:
          if (tag !== 250) {
            break;
          }

          message.userTopicList = UserTopicListRequest.decode(reader, reader.uint32());
          continue;
        case 32:
          if (tag !== 258) {
            break;
          }

          message.userTopicUpdate = UserTopicUpdateRequest.decode(reader, reader.uint32());
          continue;
        case 33:
          if (tag !== 266) {
            break;
          }

          message.sendPushNotification = SendPushNotificationRequest.decode(reader, reader.uint32());
          continue;
        case 34:
          if (tag !== 274) {
            break;
          }

          message.updatePushStatus = UpdatePushStatusRequest.decode(reader, reader.uint32());
          continue;
        case 35:
          if (tag !== 282) {
            break;
          }

          message.cancelPush = CancelPushRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Command {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      method: isSet(object.method) ? command_MethodTypeFromJSON(object.method) : 0,
      params: isSet(object.params) ? bytesFromBase64(object.params) : new Uint8Array(0),
      publish: isSet(object.publish) ? PublishRequest.fromJSON(object.publish) : undefined,
      broadcast: isSet(object.broadcast) ? BroadcastRequest.fromJSON(object.broadcast) : undefined,
      subscribe: isSet(object.subscribe) ? SubscribeRequest.fromJSON(object.subscribe) : undefined,
      unsubscribe: isSet(object.unsubscribe) ? UnsubscribeRequest.fromJSON(object.unsubscribe) : undefined,
      disconnect: isSet(object.disconnect) ? DisconnectRequest.fromJSON(object.disconnect) : undefined,
      presence: isSet(object.presence) ? PresenceRequest.fromJSON(object.presence) : undefined,
      presenceStats: isSet(object.presenceStats) ? PresenceStatsRequest.fromJSON(object.presenceStats) : undefined,
      history: isSet(object.history) ? HistoryRequest.fromJSON(object.history) : undefined,
      historyRemove: isSet(object.historyRemove) ? HistoryRemoveRequest.fromJSON(object.historyRemove) : undefined,
      info: isSet(object.info) ? InfoRequest.fromJSON(object.info) : undefined,
      rpc: isSet(object.rpc) ? RPCRequest.fromJSON(object.rpc) : undefined,
      refresh: isSet(object.refresh) ? RefreshRequest.fromJSON(object.refresh) : undefined,
      channels: isSet(object.channels) ? ChannelsRequest.fromJSON(object.channels) : undefined,
      connections: isSet(object.connections) ? ConnectionsRequest.fromJSON(object.connections) : undefined,
      updateUserStatus: isSet(object.updateUserStatus)
        ? UpdateUserStatusRequest.fromJSON(object.updateUserStatus)
        : undefined,
      getUserStatus: isSet(object.getUserStatus) ? GetUserStatusRequest.fromJSON(object.getUserStatus) : undefined,
      deleteUserStatus: isSet(object.deleteUserStatus)
        ? DeleteUserStatusRequest.fromJSON(object.deleteUserStatus)
        : undefined,
      blockUser: isSet(object.blockUser) ? BlockUserRequest.fromJSON(object.blockUser) : undefined,
      unblockUser: isSet(object.unblockUser) ? UnblockUserRequest.fromJSON(object.unblockUser) : undefined,
      revokeToken: isSet(object.revokeToken) ? RevokeTokenRequest.fromJSON(object.revokeToken) : undefined,
      invalidateUserTokens: isSet(object.invalidateUserTokens)
        ? InvalidateUserTokensRequest.fromJSON(object.invalidateUserTokens)
        : undefined,
      deviceRegister: isSet(object.deviceRegister) ? DeviceRegisterRequest.fromJSON(object.deviceRegister) : undefined,
      deviceUpdate: isSet(object.deviceUpdate) ? DeviceUpdateRequest.fromJSON(object.deviceUpdate) : undefined,
      deviceRemove: isSet(object.deviceRemove) ? DeviceRemoveRequest.fromJSON(object.deviceRemove) : undefined,
      deviceList: isSet(object.deviceList) ? DeviceListRequest.fromJSON(object.deviceList) : undefined,
      deviceTopicList: isSet(object.deviceTopicList)
        ? DeviceTopicListRequest.fromJSON(object.deviceTopicList)
        : undefined,
      deviceTopicUpdate: isSet(object.deviceTopicUpdate)
        ? DeviceTopicUpdateRequest.fromJSON(object.deviceTopicUpdate)
        : undefined,
      userTopicList: isSet(object.userTopicList) ? UserTopicListRequest.fromJSON(object.userTopicList) : undefined,
      userTopicUpdate: isSet(object.userTopicUpdate)
        ? UserTopicUpdateRequest.fromJSON(object.userTopicUpdate)
        : undefined,
      sendPushNotification: isSet(object.sendPushNotification)
        ? SendPushNotificationRequest.fromJSON(object.sendPushNotification)
        : undefined,
      updatePushStatus: isSet(object.updatePushStatus)
        ? UpdatePushStatusRequest.fromJSON(object.updatePushStatus)
        : undefined,
      cancelPush: isSet(object.cancelPush) ? CancelPushRequest.fromJSON(object.cancelPush) : undefined,
    };
  },

  toJSON(message: Command): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.method !== 0) {
      obj.method = command_MethodTypeToJSON(message.method);
    }
    if (message.params.length !== 0) {
      obj.params = base64FromBytes(message.params);
    }
    if (message.publish !== undefined) {
      obj.publish = PublishRequest.toJSON(message.publish);
    }
    if (message.broadcast !== undefined) {
      obj.broadcast = BroadcastRequest.toJSON(message.broadcast);
    }
    if (message.subscribe !== undefined) {
      obj.subscribe = SubscribeRequest.toJSON(message.subscribe);
    }
    if (message.unsubscribe !== undefined) {
      obj.unsubscribe = UnsubscribeRequest.toJSON(message.unsubscribe);
    }
    if (message.disconnect !== undefined) {
      obj.disconnect = DisconnectRequest.toJSON(message.disconnect);
    }
    if (message.presence !== undefined) {
      obj.presence = PresenceRequest.toJSON(message.presence);
    }
    if (message.presenceStats !== undefined) {
      obj.presenceStats = PresenceStatsRequest.toJSON(message.presenceStats);
    }
    if (message.history !== undefined) {
      obj.history = HistoryRequest.toJSON(message.history);
    }
    if (message.historyRemove !== undefined) {
      obj.historyRemove = HistoryRemoveRequest.toJSON(message.historyRemove);
    }
    if (message.info !== undefined) {
      obj.info = InfoRequest.toJSON(message.info);
    }
    if (message.rpc !== undefined) {
      obj.rpc = RPCRequest.toJSON(message.rpc);
    }
    if (message.refresh !== undefined) {
      obj.refresh = RefreshRequest.toJSON(message.refresh);
    }
    if (message.channels !== undefined) {
      obj.channels = ChannelsRequest.toJSON(message.channels);
    }
    if (message.connections !== undefined) {
      obj.connections = ConnectionsRequest.toJSON(message.connections);
    }
    if (message.updateUserStatus !== undefined) {
      obj.updateUserStatus = UpdateUserStatusRequest.toJSON(message.updateUserStatus);
    }
    if (message.getUserStatus !== undefined) {
      obj.getUserStatus = GetUserStatusRequest.toJSON(message.getUserStatus);
    }
    if (message.deleteUserStatus !== undefined) {
      obj.deleteUserStatus = DeleteUserStatusRequest.toJSON(message.deleteUserStatus);
    }
    if (message.blockUser !== undefined) {
      obj.blockUser = BlockUserRequest.toJSON(message.blockUser);
    }
    if (message.unblockUser !== undefined) {
      obj.unblockUser = UnblockUserRequest.toJSON(message.unblockUser);
    }
    if (message.revokeToken !== undefined) {
      obj.revokeToken = RevokeTokenRequest.toJSON(message.revokeToken);
    }
    if (message.invalidateUserTokens !== undefined) {
      obj.invalidateUserTokens = InvalidateUserTokensRequest.toJSON(message.invalidateUserTokens);
    }
    if (message.deviceRegister !== undefined) {
      obj.deviceRegister = DeviceRegisterRequest.toJSON(message.deviceRegister);
    }
    if (message.deviceUpdate !== undefined) {
      obj.deviceUpdate = DeviceUpdateRequest.toJSON(message.deviceUpdate);
    }
    if (message.deviceRemove !== undefined) {
      obj.deviceRemove = DeviceRemoveRequest.toJSON(message.deviceRemove);
    }
    if (message.deviceList !== undefined) {
      obj.deviceList = DeviceListRequest.toJSON(message.deviceList);
    }
    if (message.deviceTopicList !== undefined) {
      obj.deviceTopicList = DeviceTopicListRequest.toJSON(message.deviceTopicList);
    }
    if (message.deviceTopicUpdate !== undefined) {
      obj.deviceTopicUpdate = DeviceTopicUpdateRequest.toJSON(message.deviceTopicUpdate);
    }
    if (message.userTopicList !== undefined) {
      obj.userTopicList = UserTopicListRequest.toJSON(message.userTopicList);
    }
    if (message.userTopicUpdate !== undefined) {
      obj.userTopicUpdate = UserTopicUpdateRequest.toJSON(message.userTopicUpdate);
    }
    if (message.sendPushNotification !== undefined) {
      obj.sendPushNotification = SendPushNotificationRequest.toJSON(message.sendPushNotification);
    }
    if (message.updatePushStatus !== undefined) {
      obj.updatePushStatus = UpdatePushStatusRequest.toJSON(message.updatePushStatus);
    }
    if (message.cancelPush !== undefined) {
      obj.cancelPush = CancelPushRequest.toJSON(message.cancelPush);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Command>, I>>(base?: I): Command {
    return Command.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Command>, I>>(object: I): Command {
    const message = createBaseCommand();
    message.id = object.id ?? 0;
    message.method = object.method ?? 0;
    message.params = object.params ?? new Uint8Array(0);
    message.publish = (object.publish !== undefined && object.publish !== null)
      ? PublishRequest.fromPartial(object.publish)
      : undefined;
    message.broadcast = (object.broadcast !== undefined && object.broadcast !== null)
      ? BroadcastRequest.fromPartial(object.broadcast)
      : undefined;
    message.subscribe = (object.subscribe !== undefined && object.subscribe !== null)
      ? SubscribeRequest.fromPartial(object.subscribe)
      : undefined;
    message.unsubscribe = (object.unsubscribe !== undefined && object.unsubscribe !== null)
      ? UnsubscribeRequest.fromPartial(object.unsubscribe)
      : undefined;
    message.disconnect = (object.disconnect !== undefined && object.disconnect !== null)
      ? DisconnectRequest.fromPartial(object.disconnect)
      : undefined;
    message.presence = (object.presence !== undefined && object.presence !== null)
      ? PresenceRequest.fromPartial(object.presence)
      : undefined;
    message.presenceStats = (object.presenceStats !== undefined && object.presenceStats !== null)
      ? PresenceStatsRequest.fromPartial(object.presenceStats)
      : undefined;
    message.history = (object.history !== undefined && object.history !== null)
      ? HistoryRequest.fromPartial(object.history)
      : undefined;
    message.historyRemove = (object.historyRemove !== undefined && object.historyRemove !== null)
      ? HistoryRemoveRequest.fromPartial(object.historyRemove)
      : undefined;
    message.info = (object.info !== undefined && object.info !== null)
      ? InfoRequest.fromPartial(object.info)
      : undefined;
    message.rpc = (object.rpc !== undefined && object.rpc !== null) ? RPCRequest.fromPartial(object.rpc) : undefined;
    message.refresh = (object.refresh !== undefined && object.refresh !== null)
      ? RefreshRequest.fromPartial(object.refresh)
      : undefined;
    message.channels = (object.channels !== undefined && object.channels !== null)
      ? ChannelsRequest.fromPartial(object.channels)
      : undefined;
    message.connections = (object.connections !== undefined && object.connections !== null)
      ? ConnectionsRequest.fromPartial(object.connections)
      : undefined;
    message.updateUserStatus = (object.updateUserStatus !== undefined && object.updateUserStatus !== null)
      ? UpdateUserStatusRequest.fromPartial(object.updateUserStatus)
      : undefined;
    message.getUserStatus = (object.getUserStatus !== undefined && object.getUserStatus !== null)
      ? GetUserStatusRequest.fromPartial(object.getUserStatus)
      : undefined;
    message.deleteUserStatus = (object.deleteUserStatus !== undefined && object.deleteUserStatus !== null)
      ? DeleteUserStatusRequest.fromPartial(object.deleteUserStatus)
      : undefined;
    message.blockUser = (object.blockUser !== undefined && object.blockUser !== null)
      ? BlockUserRequest.fromPartial(object.blockUser)
      : undefined;
    message.unblockUser = (object.unblockUser !== undefined && object.unblockUser !== null)
      ? UnblockUserRequest.fromPartial(object.unblockUser)
      : undefined;
    message.revokeToken = (object.revokeToken !== undefined && object.revokeToken !== null)
      ? RevokeTokenRequest.fromPartial(object.revokeToken)
      : undefined;
    message.invalidateUserTokens = (object.invalidateUserTokens !== undefined && object.invalidateUserTokens !== null)
      ? InvalidateUserTokensRequest.fromPartial(object.invalidateUserTokens)
      : undefined;
    message.deviceRegister = (object.deviceRegister !== undefined && object.deviceRegister !== null)
      ? DeviceRegisterRequest.fromPartial(object.deviceRegister)
      : undefined;
    message.deviceUpdate = (object.deviceUpdate !== undefined && object.deviceUpdate !== null)
      ? DeviceUpdateRequest.fromPartial(object.deviceUpdate)
      : undefined;
    message.deviceRemove = (object.deviceRemove !== undefined && object.deviceRemove !== null)
      ? DeviceRemoveRequest.fromPartial(object.deviceRemove)
      : undefined;
    message.deviceList = (object.deviceList !== undefined && object.deviceList !== null)
      ? DeviceListRequest.fromPartial(object.deviceList)
      : undefined;
    message.deviceTopicList = (object.deviceTopicList !== undefined && object.deviceTopicList !== null)
      ? DeviceTopicListRequest.fromPartial(object.deviceTopicList)
      : undefined;
    message.deviceTopicUpdate = (object.deviceTopicUpdate !== undefined && object.deviceTopicUpdate !== null)
      ? DeviceTopicUpdateRequest.fromPartial(object.deviceTopicUpdate)
      : undefined;
    message.userTopicList = (object.userTopicList !== undefined && object.userTopicList !== null)
      ? UserTopicListRequest.fromPartial(object.userTopicList)
      : undefined;
    message.userTopicUpdate = (object.userTopicUpdate !== undefined && object.userTopicUpdate !== null)
      ? UserTopicUpdateRequest.fromPartial(object.userTopicUpdate)
      : undefined;
    message.sendPushNotification = (object.sendPushNotification !== undefined && object.sendPushNotification !== null)
      ? SendPushNotificationRequest.fromPartial(object.sendPushNotification)
      : undefined;
    message.updatePushStatus = (object.updatePushStatus !== undefined && object.updatePushStatus !== null)
      ? UpdatePushStatusRequest.fromPartial(object.updatePushStatus)
      : undefined;
    message.cancelPush = (object.cancelPush !== undefined && object.cancelPush !== null)
      ? CancelPushRequest.fromPartial(object.cancelPush)
      : undefined;
    return message;
  },
};

function createBaseError(): Error {
  return { code: 0, message: "" };
}

export const Error = {
  encode(message: Error, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Error {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Error {
    return {
      code: isSet(object.code) ? globalThis.Number(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: Error): unknown {
    const obj: any = {};
    if (message.code !== 0) {
      obj.code = Math.round(message.code);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Error>, I>>(base?: I): Error {
    return Error.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Error>, I>>(object: I): Error {
    const message = createBaseError();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseReply(): Reply {
  return {
    id: 0,
    error: undefined,
    result: new Uint8Array(0),
    publish: undefined,
    broadcast: undefined,
    subscribe: undefined,
    unsubscribe: undefined,
    disconnect: undefined,
    presence: undefined,
    presenceStats: undefined,
    history: undefined,
    historyRemove: undefined,
    info: undefined,
    rpc: undefined,
    refresh: undefined,
    channels: undefined,
    connections: undefined,
    updateUserStatus: undefined,
    getUserStatus: undefined,
    deleteUserStatus: undefined,
    blockUser: undefined,
    unblockUser: undefined,
    revokeToken: undefined,
    invalidateUserTokens: undefined,
    deviceRegister: undefined,
    deviceUpdate: undefined,
    deviceRemove: undefined,
    deviceList: undefined,
    deviceTopicList: undefined,
    deviceTopicUpdate: undefined,
    userTopicList: undefined,
    userTopicUpdate: undefined,
    sendPushNotification: undefined,
    updatePushStatus: undefined,
    cancelPush: undefined,
  };
}

export const Reply = {
  encode(message: Reply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.result.length !== 0) {
      writer.uint32(26).bytes(message.result);
    }
    if (message.publish !== undefined) {
      PublishResult.encode(message.publish, writer.uint32(34).fork()).ldelim();
    }
    if (message.broadcast !== undefined) {
      BroadcastResult.encode(message.broadcast, writer.uint32(42).fork()).ldelim();
    }
    if (message.subscribe !== undefined) {
      SubscribeResult.encode(message.subscribe, writer.uint32(50).fork()).ldelim();
    }
    if (message.unsubscribe !== undefined) {
      UnsubscribeResult.encode(message.unsubscribe, writer.uint32(58).fork()).ldelim();
    }
    if (message.disconnect !== undefined) {
      DisconnectResult.encode(message.disconnect, writer.uint32(66).fork()).ldelim();
    }
    if (message.presence !== undefined) {
      PresenceResult.encode(message.presence, writer.uint32(74).fork()).ldelim();
    }
    if (message.presenceStats !== undefined) {
      PresenceStatsResult.encode(message.presenceStats, writer.uint32(82).fork()).ldelim();
    }
    if (message.history !== undefined) {
      HistoryResult.encode(message.history, writer.uint32(90).fork()).ldelim();
    }
    if (message.historyRemove !== undefined) {
      HistoryRemoveResult.encode(message.historyRemove, writer.uint32(98).fork()).ldelim();
    }
    if (message.info !== undefined) {
      InfoResult.encode(message.info, writer.uint32(106).fork()).ldelim();
    }
    if (message.rpc !== undefined) {
      RPCResult.encode(message.rpc, writer.uint32(114).fork()).ldelim();
    }
    if (message.refresh !== undefined) {
      RefreshResult.encode(message.refresh, writer.uint32(122).fork()).ldelim();
    }
    if (message.channels !== undefined) {
      ChannelsResult.encode(message.channels, writer.uint32(130).fork()).ldelim();
    }
    if (message.connections !== undefined) {
      ConnectionsResult.encode(message.connections, writer.uint32(138).fork()).ldelim();
    }
    if (message.updateUserStatus !== undefined) {
      UpdateUserStatusResult.encode(message.updateUserStatus, writer.uint32(146).fork()).ldelim();
    }
    if (message.getUserStatus !== undefined) {
      GetUserStatusResult.encode(message.getUserStatus, writer.uint32(154).fork()).ldelim();
    }
    if (message.deleteUserStatus !== undefined) {
      DeleteUserStatusResult.encode(message.deleteUserStatus, writer.uint32(162).fork()).ldelim();
    }
    if (message.blockUser !== undefined) {
      BlockUserResult.encode(message.blockUser, writer.uint32(170).fork()).ldelim();
    }
    if (message.unblockUser !== undefined) {
      UnblockUserResult.encode(message.unblockUser, writer.uint32(178).fork()).ldelim();
    }
    if (message.revokeToken !== undefined) {
      RevokeTokenResult.encode(message.revokeToken, writer.uint32(186).fork()).ldelim();
    }
    if (message.invalidateUserTokens !== undefined) {
      InvalidateUserTokensResult.encode(message.invalidateUserTokens, writer.uint32(194).fork()).ldelim();
    }
    if (message.deviceRegister !== undefined) {
      DeviceRegisterResult.encode(message.deviceRegister, writer.uint32(202).fork()).ldelim();
    }
    if (message.deviceUpdate !== undefined) {
      DeviceUpdateResult.encode(message.deviceUpdate, writer.uint32(210).fork()).ldelim();
    }
    if (message.deviceRemove !== undefined) {
      DeviceRemoveResult.encode(message.deviceRemove, writer.uint32(218).fork()).ldelim();
    }
    if (message.deviceList !== undefined) {
      DeviceListResult.encode(message.deviceList, writer.uint32(226).fork()).ldelim();
    }
    if (message.deviceTopicList !== undefined) {
      DeviceTopicListResult.encode(message.deviceTopicList, writer.uint32(234).fork()).ldelim();
    }
    if (message.deviceTopicUpdate !== undefined) {
      DeviceTopicUpdateResult.encode(message.deviceTopicUpdate, writer.uint32(242).fork()).ldelim();
    }
    if (message.userTopicList !== undefined) {
      UserTopicListResult.encode(message.userTopicList, writer.uint32(250).fork()).ldelim();
    }
    if (message.userTopicUpdate !== undefined) {
      UserTopicUpdateResult.encode(message.userTopicUpdate, writer.uint32(258).fork()).ldelim();
    }
    if (message.sendPushNotification !== undefined) {
      SendPushNotificationResult.encode(message.sendPushNotification, writer.uint32(266).fork()).ldelim();
    }
    if (message.updatePushStatus !== undefined) {
      UpdatePushStatusResult.encode(message.updatePushStatus, writer.uint32(274).fork()).ldelim();
    }
    if (message.cancelPush !== undefined) {
      CancelPushResult.encode(message.cancelPush, writer.uint32(282).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Reply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.result = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.publish = PublishResult.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.broadcast = BroadcastResult.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.subscribe = SubscribeResult.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.unsubscribe = UnsubscribeResult.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.disconnect = DisconnectResult.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.presence = PresenceResult.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.presenceStats = PresenceStatsResult.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.history = HistoryResult.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.historyRemove = HistoryRemoveResult.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.info = InfoResult.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.rpc = RPCResult.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.refresh = RefreshResult.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.channels = ChannelsResult.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.connections = ConnectionsResult.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.updateUserStatus = UpdateUserStatusResult.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.getUserStatus = GetUserStatusResult.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.deleteUserStatus = DeleteUserStatusResult.decode(reader, reader.uint32());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.blockUser = BlockUserResult.decode(reader, reader.uint32());
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.unblockUser = UnblockUserResult.decode(reader, reader.uint32());
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.revokeToken = RevokeTokenResult.decode(reader, reader.uint32());
          continue;
        case 24:
          if (tag !== 194) {
            break;
          }

          message.invalidateUserTokens = InvalidateUserTokensResult.decode(reader, reader.uint32());
          continue;
        case 25:
          if (tag !== 202) {
            break;
          }

          message.deviceRegister = DeviceRegisterResult.decode(reader, reader.uint32());
          continue;
        case 26:
          if (tag !== 210) {
            break;
          }

          message.deviceUpdate = DeviceUpdateResult.decode(reader, reader.uint32());
          continue;
        case 27:
          if (tag !== 218) {
            break;
          }

          message.deviceRemove = DeviceRemoveResult.decode(reader, reader.uint32());
          continue;
        case 28:
          if (tag !== 226) {
            break;
          }

          message.deviceList = DeviceListResult.decode(reader, reader.uint32());
          continue;
        case 29:
          if (tag !== 234) {
            break;
          }

          message.deviceTopicList = DeviceTopicListResult.decode(reader, reader.uint32());
          continue;
        case 30:
          if (tag !== 242) {
            break;
          }

          message.deviceTopicUpdate = DeviceTopicUpdateResult.decode(reader, reader.uint32());
          continue;
        case 31:
          if (tag !== 250) {
            break;
          }

          message.userTopicList = UserTopicListResult.decode(reader, reader.uint32());
          continue;
        case 32:
          if (tag !== 258) {
            break;
          }

          message.userTopicUpdate = UserTopicUpdateResult.decode(reader, reader.uint32());
          continue;
        case 33:
          if (tag !== 266) {
            break;
          }

          message.sendPushNotification = SendPushNotificationResult.decode(reader, reader.uint32());
          continue;
        case 34:
          if (tag !== 274) {
            break;
          }

          message.updatePushStatus = UpdatePushStatusResult.decode(reader, reader.uint32());
          continue;
        case 35:
          if (tag !== 282) {
            break;
          }

          message.cancelPush = CancelPushResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Reply {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? bytesFromBase64(object.result) : new Uint8Array(0),
      publish: isSet(object.publish) ? PublishResult.fromJSON(object.publish) : undefined,
      broadcast: isSet(object.broadcast) ? BroadcastResult.fromJSON(object.broadcast) : undefined,
      subscribe: isSet(object.subscribe) ? SubscribeResult.fromJSON(object.subscribe) : undefined,
      unsubscribe: isSet(object.unsubscribe) ? UnsubscribeResult.fromJSON(object.unsubscribe) : undefined,
      disconnect: isSet(object.disconnect) ? DisconnectResult.fromJSON(object.disconnect) : undefined,
      presence: isSet(object.presence) ? PresenceResult.fromJSON(object.presence) : undefined,
      presenceStats: isSet(object.presenceStats) ? PresenceStatsResult.fromJSON(object.presenceStats) : undefined,
      history: isSet(object.history) ? HistoryResult.fromJSON(object.history) : undefined,
      historyRemove: isSet(object.historyRemove) ? HistoryRemoveResult.fromJSON(object.historyRemove) : undefined,
      info: isSet(object.info) ? InfoResult.fromJSON(object.info) : undefined,
      rpc: isSet(object.rpc) ? RPCResult.fromJSON(object.rpc) : undefined,
      refresh: isSet(object.refresh) ? RefreshResult.fromJSON(object.refresh) : undefined,
      channels: isSet(object.channels) ? ChannelsResult.fromJSON(object.channels) : undefined,
      connections: isSet(object.connections) ? ConnectionsResult.fromJSON(object.connections) : undefined,
      updateUserStatus: isSet(object.updateUserStatus)
        ? UpdateUserStatusResult.fromJSON(object.updateUserStatus)
        : undefined,
      getUserStatus: isSet(object.getUserStatus) ? GetUserStatusResult.fromJSON(object.getUserStatus) : undefined,
      deleteUserStatus: isSet(object.deleteUserStatus)
        ? DeleteUserStatusResult.fromJSON(object.deleteUserStatus)
        : undefined,
      blockUser: isSet(object.blockUser) ? BlockUserResult.fromJSON(object.blockUser) : undefined,
      unblockUser: isSet(object.unblockUser) ? UnblockUserResult.fromJSON(object.unblockUser) : undefined,
      revokeToken: isSet(object.revokeToken) ? RevokeTokenResult.fromJSON(object.revokeToken) : undefined,
      invalidateUserTokens: isSet(object.invalidateUserTokens)
        ? InvalidateUserTokensResult.fromJSON(object.invalidateUserTokens)
        : undefined,
      deviceRegister: isSet(object.deviceRegister) ? DeviceRegisterResult.fromJSON(object.deviceRegister) : undefined,
      deviceUpdate: isSet(object.deviceUpdate) ? DeviceUpdateResult.fromJSON(object.deviceUpdate) : undefined,
      deviceRemove: isSet(object.deviceRemove) ? DeviceRemoveResult.fromJSON(object.deviceRemove) : undefined,
      deviceList: isSet(object.deviceList) ? DeviceListResult.fromJSON(object.deviceList) : undefined,
      deviceTopicList: isSet(object.deviceTopicList)
        ? DeviceTopicListResult.fromJSON(object.deviceTopicList)
        : undefined,
      deviceTopicUpdate: isSet(object.deviceTopicUpdate)
        ? DeviceTopicUpdateResult.fromJSON(object.deviceTopicUpdate)
        : undefined,
      userTopicList: isSet(object.userTopicList) ? UserTopicListResult.fromJSON(object.userTopicList) : undefined,
      userTopicUpdate: isSet(object.userTopicUpdate)
        ? UserTopicUpdateResult.fromJSON(object.userTopicUpdate)
        : undefined,
      sendPushNotification: isSet(object.sendPushNotification)
        ? SendPushNotificationResult.fromJSON(object.sendPushNotification)
        : undefined,
      updatePushStatus: isSet(object.updatePushStatus)
        ? UpdatePushStatusResult.fromJSON(object.updatePushStatus)
        : undefined,
      cancelPush: isSet(object.cancelPush) ? CancelPushResult.fromJSON(object.cancelPush) : undefined,
    };
  },

  toJSON(message: Reply): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result.length !== 0) {
      obj.result = base64FromBytes(message.result);
    }
    if (message.publish !== undefined) {
      obj.publish = PublishResult.toJSON(message.publish);
    }
    if (message.broadcast !== undefined) {
      obj.broadcast = BroadcastResult.toJSON(message.broadcast);
    }
    if (message.subscribe !== undefined) {
      obj.subscribe = SubscribeResult.toJSON(message.subscribe);
    }
    if (message.unsubscribe !== undefined) {
      obj.unsubscribe = UnsubscribeResult.toJSON(message.unsubscribe);
    }
    if (message.disconnect !== undefined) {
      obj.disconnect = DisconnectResult.toJSON(message.disconnect);
    }
    if (message.presence !== undefined) {
      obj.presence = PresenceResult.toJSON(message.presence);
    }
    if (message.presenceStats !== undefined) {
      obj.presenceStats = PresenceStatsResult.toJSON(message.presenceStats);
    }
    if (message.history !== undefined) {
      obj.history = HistoryResult.toJSON(message.history);
    }
    if (message.historyRemove !== undefined) {
      obj.historyRemove = HistoryRemoveResult.toJSON(message.historyRemove);
    }
    if (message.info !== undefined) {
      obj.info = InfoResult.toJSON(message.info);
    }
    if (message.rpc !== undefined) {
      obj.rpc = RPCResult.toJSON(message.rpc);
    }
    if (message.refresh !== undefined) {
      obj.refresh = RefreshResult.toJSON(message.refresh);
    }
    if (message.channels !== undefined) {
      obj.channels = ChannelsResult.toJSON(message.channels);
    }
    if (message.connections !== undefined) {
      obj.connections = ConnectionsResult.toJSON(message.connections);
    }
    if (message.updateUserStatus !== undefined) {
      obj.updateUserStatus = UpdateUserStatusResult.toJSON(message.updateUserStatus);
    }
    if (message.getUserStatus !== undefined) {
      obj.getUserStatus = GetUserStatusResult.toJSON(message.getUserStatus);
    }
    if (message.deleteUserStatus !== undefined) {
      obj.deleteUserStatus = DeleteUserStatusResult.toJSON(message.deleteUserStatus);
    }
    if (message.blockUser !== undefined) {
      obj.blockUser = BlockUserResult.toJSON(message.blockUser);
    }
    if (message.unblockUser !== undefined) {
      obj.unblockUser = UnblockUserResult.toJSON(message.unblockUser);
    }
    if (message.revokeToken !== undefined) {
      obj.revokeToken = RevokeTokenResult.toJSON(message.revokeToken);
    }
    if (message.invalidateUserTokens !== undefined) {
      obj.invalidateUserTokens = InvalidateUserTokensResult.toJSON(message.invalidateUserTokens);
    }
    if (message.deviceRegister !== undefined) {
      obj.deviceRegister = DeviceRegisterResult.toJSON(message.deviceRegister);
    }
    if (message.deviceUpdate !== undefined) {
      obj.deviceUpdate = DeviceUpdateResult.toJSON(message.deviceUpdate);
    }
    if (message.deviceRemove !== undefined) {
      obj.deviceRemove = DeviceRemoveResult.toJSON(message.deviceRemove);
    }
    if (message.deviceList !== undefined) {
      obj.deviceList = DeviceListResult.toJSON(message.deviceList);
    }
    if (message.deviceTopicList !== undefined) {
      obj.deviceTopicList = DeviceTopicListResult.toJSON(message.deviceTopicList);
    }
    if (message.deviceTopicUpdate !== undefined) {
      obj.deviceTopicUpdate = DeviceTopicUpdateResult.toJSON(message.deviceTopicUpdate);
    }
    if (message.userTopicList !== undefined) {
      obj.userTopicList = UserTopicListResult.toJSON(message.userTopicList);
    }
    if (message.userTopicUpdate !== undefined) {
      obj.userTopicUpdate = UserTopicUpdateResult.toJSON(message.userTopicUpdate);
    }
    if (message.sendPushNotification !== undefined) {
      obj.sendPushNotification = SendPushNotificationResult.toJSON(message.sendPushNotification);
    }
    if (message.updatePushStatus !== undefined) {
      obj.updatePushStatus = UpdatePushStatusResult.toJSON(message.updatePushStatus);
    }
    if (message.cancelPush !== undefined) {
      obj.cancelPush = CancelPushResult.toJSON(message.cancelPush);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Reply>, I>>(base?: I): Reply {
    return Reply.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Reply>, I>>(object: I): Reply {
    const message = createBaseReply();
    message.id = object.id ?? 0;
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = object.result ?? new Uint8Array(0);
    message.publish = (object.publish !== undefined && object.publish !== null)
      ? PublishResult.fromPartial(object.publish)
      : undefined;
    message.broadcast = (object.broadcast !== undefined && object.broadcast !== null)
      ? BroadcastResult.fromPartial(object.broadcast)
      : undefined;
    message.subscribe = (object.subscribe !== undefined && object.subscribe !== null)
      ? SubscribeResult.fromPartial(object.subscribe)
      : undefined;
    message.unsubscribe = (object.unsubscribe !== undefined && object.unsubscribe !== null)
      ? UnsubscribeResult.fromPartial(object.unsubscribe)
      : undefined;
    message.disconnect = (object.disconnect !== undefined && object.disconnect !== null)
      ? DisconnectResult.fromPartial(object.disconnect)
      : undefined;
    message.presence = (object.presence !== undefined && object.presence !== null)
      ? PresenceResult.fromPartial(object.presence)
      : undefined;
    message.presenceStats = (object.presenceStats !== undefined && object.presenceStats !== null)
      ? PresenceStatsResult.fromPartial(object.presenceStats)
      : undefined;
    message.history = (object.history !== undefined && object.history !== null)
      ? HistoryResult.fromPartial(object.history)
      : undefined;
    message.historyRemove = (object.historyRemove !== undefined && object.historyRemove !== null)
      ? HistoryRemoveResult.fromPartial(object.historyRemove)
      : undefined;
    message.info = (object.info !== undefined && object.info !== null)
      ? InfoResult.fromPartial(object.info)
      : undefined;
    message.rpc = (object.rpc !== undefined && object.rpc !== null) ? RPCResult.fromPartial(object.rpc) : undefined;
    message.refresh = (object.refresh !== undefined && object.refresh !== null)
      ? RefreshResult.fromPartial(object.refresh)
      : undefined;
    message.channels = (object.channels !== undefined && object.channels !== null)
      ? ChannelsResult.fromPartial(object.channels)
      : undefined;
    message.connections = (object.connections !== undefined && object.connections !== null)
      ? ConnectionsResult.fromPartial(object.connections)
      : undefined;
    message.updateUserStatus = (object.updateUserStatus !== undefined && object.updateUserStatus !== null)
      ? UpdateUserStatusResult.fromPartial(object.updateUserStatus)
      : undefined;
    message.getUserStatus = (object.getUserStatus !== undefined && object.getUserStatus !== null)
      ? GetUserStatusResult.fromPartial(object.getUserStatus)
      : undefined;
    message.deleteUserStatus = (object.deleteUserStatus !== undefined && object.deleteUserStatus !== null)
      ? DeleteUserStatusResult.fromPartial(object.deleteUserStatus)
      : undefined;
    message.blockUser = (object.blockUser !== undefined && object.blockUser !== null)
      ? BlockUserResult.fromPartial(object.blockUser)
      : undefined;
    message.unblockUser = (object.unblockUser !== undefined && object.unblockUser !== null)
      ? UnblockUserResult.fromPartial(object.unblockUser)
      : undefined;
    message.revokeToken = (object.revokeToken !== undefined && object.revokeToken !== null)
      ? RevokeTokenResult.fromPartial(object.revokeToken)
      : undefined;
    message.invalidateUserTokens = (object.invalidateUserTokens !== undefined && object.invalidateUserTokens !== null)
      ? InvalidateUserTokensResult.fromPartial(object.invalidateUserTokens)
      : undefined;
    message.deviceRegister = (object.deviceRegister !== undefined && object.deviceRegister !== null)
      ? DeviceRegisterResult.fromPartial(object.deviceRegister)
      : undefined;
    message.deviceUpdate = (object.deviceUpdate !== undefined && object.deviceUpdate !== null)
      ? DeviceUpdateResult.fromPartial(object.deviceUpdate)
      : undefined;
    message.deviceRemove = (object.deviceRemove !== undefined && object.deviceRemove !== null)
      ? DeviceRemoveResult.fromPartial(object.deviceRemove)
      : undefined;
    message.deviceList = (object.deviceList !== undefined && object.deviceList !== null)
      ? DeviceListResult.fromPartial(object.deviceList)
      : undefined;
    message.deviceTopicList = (object.deviceTopicList !== undefined && object.deviceTopicList !== null)
      ? DeviceTopicListResult.fromPartial(object.deviceTopicList)
      : undefined;
    message.deviceTopicUpdate = (object.deviceTopicUpdate !== undefined && object.deviceTopicUpdate !== null)
      ? DeviceTopicUpdateResult.fromPartial(object.deviceTopicUpdate)
      : undefined;
    message.userTopicList = (object.userTopicList !== undefined && object.userTopicList !== null)
      ? UserTopicListResult.fromPartial(object.userTopicList)
      : undefined;
    message.userTopicUpdate = (object.userTopicUpdate !== undefined && object.userTopicUpdate !== null)
      ? UserTopicUpdateResult.fromPartial(object.userTopicUpdate)
      : undefined;
    message.sendPushNotification = (object.sendPushNotification !== undefined && object.sendPushNotification !== null)
      ? SendPushNotificationResult.fromPartial(object.sendPushNotification)
      : undefined;
    message.updatePushStatus = (object.updatePushStatus !== undefined && object.updatePushStatus !== null)
      ? UpdatePushStatusResult.fromPartial(object.updatePushStatus)
      : undefined;
    message.cancelPush = (object.cancelPush !== undefined && object.cancelPush !== null)
      ? CancelPushResult.fromPartial(object.cancelPush)
      : undefined;
    return message;
  },
};

function createBaseBoolValue(): BoolValue {
  return { value: false };
}

export const BoolValue = {
  encode(message: BoolValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== false) {
      writer.uint32(8).bool(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BoolValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBoolValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.value = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BoolValue {
    return { value: isSet(object.value) ? globalThis.Boolean(object.value) : false };
  },

  toJSON(message: BoolValue): unknown {
    const obj: any = {};
    if (message.value !== false) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BoolValue>, I>>(base?: I): BoolValue {
    return BoolValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BoolValue>, I>>(object: I): BoolValue {
    const message = createBaseBoolValue();
    message.value = object.value ?? false;
    return message;
  },
};

function createBaseInt32Value(): Int32Value {
  return { value: 0 };
}

export const Int32Value = {
  encode(message: Int32Value, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== 0) {
      writer.uint32(8).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Int32Value {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInt32Value();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.value = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Int32Value {
    return { value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
  },

  toJSON(message: Int32Value): unknown {
    const obj: any = {};
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Int32Value>, I>>(base?: I): Int32Value {
    return Int32Value.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Int32Value>, I>>(object: I): Int32Value {
    const message = createBaseInt32Value();
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseSubscribeOptionOverride(): SubscribeOptionOverride {
  return {
    presence: undefined,
    joinLeave: undefined,
    forceRecovery: undefined,
    forcePositioning: undefined,
    forcePushJoinLeave: undefined,
  };
}

export const SubscribeOptionOverride = {
  encode(message: SubscribeOptionOverride, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.presence !== undefined) {
      BoolValue.encode(message.presence, writer.uint32(10).fork()).ldelim();
    }
    if (message.joinLeave !== undefined) {
      BoolValue.encode(message.joinLeave, writer.uint32(18).fork()).ldelim();
    }
    if (message.forceRecovery !== undefined) {
      BoolValue.encode(message.forceRecovery, writer.uint32(26).fork()).ldelim();
    }
    if (message.forcePositioning !== undefined) {
      BoolValue.encode(message.forcePositioning, writer.uint32(34).fork()).ldelim();
    }
    if (message.forcePushJoinLeave !== undefined) {
      BoolValue.encode(message.forcePushJoinLeave, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscribeOptionOverride {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeOptionOverride();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.presence = BoolValue.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.joinLeave = BoolValue.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.forceRecovery = BoolValue.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.forcePositioning = BoolValue.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.forcePushJoinLeave = BoolValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeOptionOverride {
    return {
      presence: isSet(object.presence) ? BoolValue.fromJSON(object.presence) : undefined,
      joinLeave: isSet(object.joinLeave) ? BoolValue.fromJSON(object.joinLeave) : undefined,
      forceRecovery: isSet(object.forceRecovery) ? BoolValue.fromJSON(object.forceRecovery) : undefined,
      forcePositioning: isSet(object.forcePositioning) ? BoolValue.fromJSON(object.forcePositioning) : undefined,
      forcePushJoinLeave: isSet(object.forcePushJoinLeave) ? BoolValue.fromJSON(object.forcePushJoinLeave) : undefined,
    };
  },

  toJSON(message: SubscribeOptionOverride): unknown {
    const obj: any = {};
    if (message.presence !== undefined) {
      obj.presence = BoolValue.toJSON(message.presence);
    }
    if (message.joinLeave !== undefined) {
      obj.joinLeave = BoolValue.toJSON(message.joinLeave);
    }
    if (message.forceRecovery !== undefined) {
      obj.forceRecovery = BoolValue.toJSON(message.forceRecovery);
    }
    if (message.forcePositioning !== undefined) {
      obj.forcePositioning = BoolValue.toJSON(message.forcePositioning);
    }
    if (message.forcePushJoinLeave !== undefined) {
      obj.forcePushJoinLeave = BoolValue.toJSON(message.forcePushJoinLeave);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeOptionOverride>, I>>(base?: I): SubscribeOptionOverride {
    return SubscribeOptionOverride.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeOptionOverride>, I>>(object: I): SubscribeOptionOverride {
    const message = createBaseSubscribeOptionOverride();
    message.presence = (object.presence !== undefined && object.presence !== null)
      ? BoolValue.fromPartial(object.presence)
      : undefined;
    message.joinLeave = (object.joinLeave !== undefined && object.joinLeave !== null)
      ? BoolValue.fromPartial(object.joinLeave)
      : undefined;
    message.forceRecovery = (object.forceRecovery !== undefined && object.forceRecovery !== null)
      ? BoolValue.fromPartial(object.forceRecovery)
      : undefined;
    message.forcePositioning = (object.forcePositioning !== undefined && object.forcePositioning !== null)
      ? BoolValue.fromPartial(object.forcePositioning)
      : undefined;
    message.forcePushJoinLeave = (object.forcePushJoinLeave !== undefined && object.forcePushJoinLeave !== null)
      ? BoolValue.fromPartial(object.forcePushJoinLeave)
      : undefined;
    return message;
  },
};

function createBaseBatchRequest(): BatchRequest {
  return { commands: [], parallel: false };
}

export const BatchRequest = {
  encode(message: BatchRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.commands) {
      Command.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.parallel !== false) {
      writer.uint32(16).bool(message.parallel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatchRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.commands.push(Command.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.parallel = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BatchRequest {
    return {
      commands: globalThis.Array.isArray(object?.commands) ? object.commands.map((e: any) => Command.fromJSON(e)) : [],
      parallel: isSet(object.parallel) ? globalThis.Boolean(object.parallel) : false,
    };
  },

  toJSON(message: BatchRequest): unknown {
    const obj: any = {};
    if (message.commands?.length) {
      obj.commands = message.commands.map((e) => Command.toJSON(e));
    }
    if (message.parallel !== false) {
      obj.parallel = message.parallel;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BatchRequest>, I>>(base?: I): BatchRequest {
    return BatchRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BatchRequest>, I>>(object: I): BatchRequest {
    const message = createBaseBatchRequest();
    message.commands = object.commands?.map((e) => Command.fromPartial(e)) || [];
    message.parallel = object.parallel ?? false;
    return message;
  },
};

function createBaseBatchResponse(): BatchResponse {
  return { replies: [] };
}

export const BatchResponse = {
  encode(message: BatchResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.replies) {
      Reply.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatchResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.replies.push(Reply.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BatchResponse {
    return {
      replies: globalThis.Array.isArray(object?.replies) ? object.replies.map((e: any) => Reply.fromJSON(e)) : [],
    };
  },

  toJSON(message: BatchResponse): unknown {
    const obj: any = {};
    if (message.replies?.length) {
      obj.replies = message.replies.map((e) => Reply.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BatchResponse>, I>>(base?: I): BatchResponse {
    return BatchResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BatchResponse>, I>>(object: I): BatchResponse {
    const message = createBaseBatchResponse();
    message.replies = object.replies?.map((e) => Reply.fromPartial(e)) || [];
    return message;
  },
};

function createBasePublishRequest(): PublishRequest {
  return { channel: "", data: new Uint8Array(0), b64data: "", skipHistory: false, tags: {}, idempotencyKey: "" };
}

export const PublishRequest = {
  encode(message: PublishRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel !== "") {
      writer.uint32(10).string(message.channel);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.b64data !== "") {
      writer.uint32(26).string(message.b64data);
    }
    if (message.skipHistory !== false) {
      writer.uint32(32).bool(message.skipHistory);
    }
    Object.entries(message.tags).forEach(([key, value]) => {
      PublishRequest_TagsEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    if (message.idempotencyKey !== "") {
      writer.uint32(50).string(message.idempotencyKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.b64data = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.skipHistory = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = PublishRequest_TagsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.tags[entry5.key] = entry5.value;
          }
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.idempotencyKey = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PublishRequest {
    return {
      channel: isSet(object.channel) ? globalThis.String(object.channel) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      b64data: isSet(object.b64data) ? globalThis.String(object.b64data) : "",
      skipHistory: isSet(object.skipHistory) ? globalThis.Boolean(object.skipHistory) : false,
      tags: isObject(object.tags)
        ? Object.entries(object.tags).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      idempotencyKey: isSet(object.idempotencyKey) ? globalThis.String(object.idempotencyKey) : "",
    };
  },

  toJSON(message: PublishRequest): unknown {
    const obj: any = {};
    if (message.channel !== "") {
      obj.channel = message.channel;
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.b64data !== "") {
      obj.b64data = message.b64data;
    }
    if (message.skipHistory !== false) {
      obj.skipHistory = message.skipHistory;
    }
    if (message.tags) {
      const entries = Object.entries(message.tags);
      if (entries.length > 0) {
        obj.tags = {};
        entries.forEach(([k, v]) => {
          obj.tags[k] = v;
        });
      }
    }
    if (message.idempotencyKey !== "") {
      obj.idempotencyKey = message.idempotencyKey;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublishRequest>, I>>(base?: I): PublishRequest {
    return PublishRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PublishRequest>, I>>(object: I): PublishRequest {
    const message = createBasePublishRequest();
    message.channel = object.channel ?? "";
    message.data = object.data ?? new Uint8Array(0);
    message.b64data = object.b64data ?? "";
    message.skipHistory = object.skipHistory ?? false;
    message.tags = Object.entries(object.tags ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    message.idempotencyKey = object.idempotencyKey ?? "";
    return message;
  },
};

function createBasePublishRequest_TagsEntry(): PublishRequest_TagsEntry {
  return { key: "", value: "" };
}

export const PublishRequest_TagsEntry = {
  encode(message: PublishRequest_TagsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishRequest_TagsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishRequest_TagsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PublishRequest_TagsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: PublishRequest_TagsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublishRequest_TagsEntry>, I>>(base?: I): PublishRequest_TagsEntry {
    return PublishRequest_TagsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PublishRequest_TagsEntry>, I>>(object: I): PublishRequest_TagsEntry {
    const message = createBasePublishRequest_TagsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBasePublishResponse(): PublishResponse {
  return { error: undefined, result: undefined };
}

export const PublishResponse = {
  encode(message: PublishResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      PublishResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = PublishResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PublishResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? PublishResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: PublishResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = PublishResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublishResponse>, I>>(base?: I): PublishResponse {
    return PublishResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PublishResponse>, I>>(object: I): PublishResponse {
    const message = createBasePublishResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? PublishResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBasePublishResult(): PublishResult {
  return { offset: 0, epoch: "" };
}

export const PublishResult = {
  encode(message: PublishResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.offset !== 0) {
      writer.uint32(8).uint64(message.offset);
    }
    if (message.epoch !== "") {
      writer.uint32(18).string(message.epoch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.epoch = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PublishResult {
    return {
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0,
      epoch: isSet(object.epoch) ? globalThis.String(object.epoch) : "",
    };
  },

  toJSON(message: PublishResult): unknown {
    const obj: any = {};
    if (message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    if (message.epoch !== "") {
      obj.epoch = message.epoch;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublishResult>, I>>(base?: I): PublishResult {
    return PublishResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PublishResult>, I>>(object: I): PublishResult {
    const message = createBasePublishResult();
    message.offset = object.offset ?? 0;
    message.epoch = object.epoch ?? "";
    return message;
  },
};

function createBaseBroadcastRequest(): BroadcastRequest {
  return { channels: [], data: new Uint8Array(0), b64data: "", skipHistory: false, tags: {}, idempotencyKey: "" };
}

export const BroadcastRequest = {
  encode(message: BroadcastRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.channels) {
      writer.uint32(10).string(v!);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.b64data !== "") {
      writer.uint32(26).string(message.b64data);
    }
    if (message.skipHistory !== false) {
      writer.uint32(32).bool(message.skipHistory);
    }
    Object.entries(message.tags).forEach(([key, value]) => {
      BroadcastRequest_TagsEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    if (message.idempotencyKey !== "") {
      writer.uint32(50).string(message.idempotencyKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BroadcastRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBroadcastRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channels.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.b64data = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.skipHistory = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = BroadcastRequest_TagsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.tags[entry5.key] = entry5.value;
          }
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.idempotencyKey = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BroadcastRequest {
    return {
      channels: globalThis.Array.isArray(object?.channels) ? object.channels.map((e: any) => globalThis.String(e)) : [],
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      b64data: isSet(object.b64data) ? globalThis.String(object.b64data) : "",
      skipHistory: isSet(object.skipHistory) ? globalThis.Boolean(object.skipHistory) : false,
      tags: isObject(object.tags)
        ? Object.entries(object.tags).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      idempotencyKey: isSet(object.idempotencyKey) ? globalThis.String(object.idempotencyKey) : "",
    };
  },

  toJSON(message: BroadcastRequest): unknown {
    const obj: any = {};
    if (message.channels?.length) {
      obj.channels = message.channels;
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.b64data !== "") {
      obj.b64data = message.b64data;
    }
    if (message.skipHistory !== false) {
      obj.skipHistory = message.skipHistory;
    }
    if (message.tags) {
      const entries = Object.entries(message.tags);
      if (entries.length > 0) {
        obj.tags = {};
        entries.forEach(([k, v]) => {
          obj.tags[k] = v;
        });
      }
    }
    if (message.idempotencyKey !== "") {
      obj.idempotencyKey = message.idempotencyKey;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BroadcastRequest>, I>>(base?: I): BroadcastRequest {
    return BroadcastRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BroadcastRequest>, I>>(object: I): BroadcastRequest {
    const message = createBaseBroadcastRequest();
    message.channels = object.channels?.map((e) => e) || [];
    message.data = object.data ?? new Uint8Array(0);
    message.b64data = object.b64data ?? "";
    message.skipHistory = object.skipHistory ?? false;
    message.tags = Object.entries(object.tags ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    message.idempotencyKey = object.idempotencyKey ?? "";
    return message;
  },
};

function createBaseBroadcastRequest_TagsEntry(): BroadcastRequest_TagsEntry {
  return { key: "", value: "" };
}

export const BroadcastRequest_TagsEntry = {
  encode(message: BroadcastRequest_TagsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BroadcastRequest_TagsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBroadcastRequest_TagsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BroadcastRequest_TagsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: BroadcastRequest_TagsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BroadcastRequest_TagsEntry>, I>>(base?: I): BroadcastRequest_TagsEntry {
    return BroadcastRequest_TagsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BroadcastRequest_TagsEntry>, I>>(object: I): BroadcastRequest_TagsEntry {
    const message = createBaseBroadcastRequest_TagsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseBroadcastResponse(): BroadcastResponse {
  return { error: undefined, result: undefined };
}

export const BroadcastResponse = {
  encode(message: BroadcastResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      BroadcastResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BroadcastResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBroadcastResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = BroadcastResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BroadcastResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? BroadcastResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: BroadcastResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = BroadcastResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BroadcastResponse>, I>>(base?: I): BroadcastResponse {
    return BroadcastResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BroadcastResponse>, I>>(object: I): BroadcastResponse {
    const message = createBaseBroadcastResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? BroadcastResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseBroadcastResult(): BroadcastResult {
  return { responses: [] };
}

export const BroadcastResult = {
  encode(message: BroadcastResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.responses) {
      PublishResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BroadcastResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBroadcastResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.responses.push(PublishResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BroadcastResult {
    return {
      responses: globalThis.Array.isArray(object?.responses)
        ? object.responses.map((e: any) => PublishResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BroadcastResult): unknown {
    const obj: any = {};
    if (message.responses?.length) {
      obj.responses = message.responses.map((e) => PublishResponse.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BroadcastResult>, I>>(base?: I): BroadcastResult {
    return BroadcastResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BroadcastResult>, I>>(object: I): BroadcastResult {
    const message = createBaseBroadcastResult();
    message.responses = object.responses?.map((e) => PublishResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSubscribeRequest(): SubscribeRequest {
  return {
    channel: "",
    user: "",
    expireAt: 0,
    info: new Uint8Array(0),
    b64info: "",
    client: "",
    data: new Uint8Array(0),
    b64data: "",
    recoverSince: undefined,
    override: undefined,
    session: "",
  };
}

export const SubscribeRequest = {
  encode(message: SubscribeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel !== "") {
      writer.uint32(10).string(message.channel);
    }
    if (message.user !== "") {
      writer.uint32(18).string(message.user);
    }
    if (message.expireAt !== 0) {
      writer.uint32(24).int64(message.expireAt);
    }
    if (message.info.length !== 0) {
      writer.uint32(34).bytes(message.info);
    }
    if (message.b64info !== "") {
      writer.uint32(42).string(message.b64info);
    }
    if (message.client !== "") {
      writer.uint32(50).string(message.client);
    }
    if (message.data.length !== 0) {
      writer.uint32(58).bytes(message.data);
    }
    if (message.b64data !== "") {
      writer.uint32(66).string(message.b64data);
    }
    if (message.recoverSince !== undefined) {
      StreamPosition.encode(message.recoverSince, writer.uint32(74).fork()).ldelim();
    }
    if (message.override !== undefined) {
      SubscribeOptionOverride.encode(message.override, writer.uint32(82).fork()).ldelim();
    }
    if (message.session !== "") {
      writer.uint32(90).string(message.session);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscribeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.user = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.expireAt = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.b64info = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.client = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.b64data = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.recoverSince = StreamPosition.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.override = SubscribeOptionOverride.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.session = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequest {
    return {
      channel: isSet(object.channel) ? globalThis.String(object.channel) : "",
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      expireAt: isSet(object.expireAt) ? globalThis.Number(object.expireAt) : 0,
      info: isSet(object.info) ? bytesFromBase64(object.info) : new Uint8Array(0),
      b64info: isSet(object.b64info) ? globalThis.String(object.b64info) : "",
      client: isSet(object.client) ? globalThis.String(object.client) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      b64data: isSet(object.b64data) ? globalThis.String(object.b64data) : "",
      recoverSince: isSet(object.recoverSince) ? StreamPosition.fromJSON(object.recoverSince) : undefined,
      override: isSet(object.override) ? SubscribeOptionOverride.fromJSON(object.override) : undefined,
      session: isSet(object.session) ? globalThis.String(object.session) : "",
    };
  },

  toJSON(message: SubscribeRequest): unknown {
    const obj: any = {};
    if (message.channel !== "") {
      obj.channel = message.channel;
    }
    if (message.user !== "") {
      obj.user = message.user;
    }
    if (message.expireAt !== 0) {
      obj.expireAt = Math.round(message.expireAt);
    }
    if (message.info.length !== 0) {
      obj.info = base64FromBytes(message.info);
    }
    if (message.b64info !== "") {
      obj.b64info = message.b64info;
    }
    if (message.client !== "") {
      obj.client = message.client;
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.b64data !== "") {
      obj.b64data = message.b64data;
    }
    if (message.recoverSince !== undefined) {
      obj.recoverSince = StreamPosition.toJSON(message.recoverSince);
    }
    if (message.override !== undefined) {
      obj.override = SubscribeOptionOverride.toJSON(message.override);
    }
    if (message.session !== "") {
      obj.session = message.session;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequest>, I>>(base?: I): SubscribeRequest {
    return SubscribeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequest>, I>>(object: I): SubscribeRequest {
    const message = createBaseSubscribeRequest();
    message.channel = object.channel ?? "";
    message.user = object.user ?? "";
    message.expireAt = object.expireAt ?? 0;
    message.info = object.info ?? new Uint8Array(0);
    message.b64info = object.b64info ?? "";
    message.client = object.client ?? "";
    message.data = object.data ?? new Uint8Array(0);
    message.b64data = object.b64data ?? "";
    message.recoverSince = (object.recoverSince !== undefined && object.recoverSince !== null)
      ? StreamPosition.fromPartial(object.recoverSince)
      : undefined;
    message.override = (object.override !== undefined && object.override !== null)
      ? SubscribeOptionOverride.fromPartial(object.override)
      : undefined;
    message.session = object.session ?? "";
    return message;
  },
};

function createBaseSubscribeResponse(): SubscribeResponse {
  return { error: undefined, result: undefined };
}

export const SubscribeResponse = {
  encode(message: SubscribeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      SubscribeResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscribeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = SubscribeResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? SubscribeResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: SubscribeResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = SubscribeResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeResponse>, I>>(base?: I): SubscribeResponse {
    return SubscribeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeResponse>, I>>(object: I): SubscribeResponse {
    const message = createBaseSubscribeResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? SubscribeResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseSubscribeResult(): SubscribeResult {
  return {};
}

export const SubscribeResult = {
  encode(_: SubscribeResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscribeResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): SubscribeResult {
    return {};
  },

  toJSON(_: SubscribeResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeResult>, I>>(base?: I): SubscribeResult {
    return SubscribeResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeResult>, I>>(_: I): SubscribeResult {
    const message = createBaseSubscribeResult();
    return message;
  },
};

function createBaseUnsubscribeRequest(): UnsubscribeRequest {
  return { channel: "", user: "", client: "", session: "" };
}

export const UnsubscribeRequest = {
  encode(message: UnsubscribeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel !== "") {
      writer.uint32(10).string(message.channel);
    }
    if (message.user !== "") {
      writer.uint32(18).string(message.user);
    }
    if (message.client !== "") {
      writer.uint32(26).string(message.client);
    }
    if (message.session !== "") {
      writer.uint32(34).string(message.session);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnsubscribeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnsubscribeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.user = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.client = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.session = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UnsubscribeRequest {
    return {
      channel: isSet(object.channel) ? globalThis.String(object.channel) : "",
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      client: isSet(object.client) ? globalThis.String(object.client) : "",
      session: isSet(object.session) ? globalThis.String(object.session) : "",
    };
  },

  toJSON(message: UnsubscribeRequest): unknown {
    const obj: any = {};
    if (message.channel !== "") {
      obj.channel = message.channel;
    }
    if (message.user !== "") {
      obj.user = message.user;
    }
    if (message.client !== "") {
      obj.client = message.client;
    }
    if (message.session !== "") {
      obj.session = message.session;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UnsubscribeRequest>, I>>(base?: I): UnsubscribeRequest {
    return UnsubscribeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UnsubscribeRequest>, I>>(object: I): UnsubscribeRequest {
    const message = createBaseUnsubscribeRequest();
    message.channel = object.channel ?? "";
    message.user = object.user ?? "";
    message.client = object.client ?? "";
    message.session = object.session ?? "";
    return message;
  },
};

function createBaseUnsubscribeResponse(): UnsubscribeResponse {
  return { error: undefined, result: undefined };
}

export const UnsubscribeResponse = {
  encode(message: UnsubscribeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      UnsubscribeResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnsubscribeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnsubscribeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = UnsubscribeResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UnsubscribeResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? UnsubscribeResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: UnsubscribeResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = UnsubscribeResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UnsubscribeResponse>, I>>(base?: I): UnsubscribeResponse {
    return UnsubscribeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UnsubscribeResponse>, I>>(object: I): UnsubscribeResponse {
    const message = createBaseUnsubscribeResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? UnsubscribeResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseUnsubscribeResult(): UnsubscribeResult {
  return {};
}

export const UnsubscribeResult = {
  encode(_: UnsubscribeResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnsubscribeResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnsubscribeResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): UnsubscribeResult {
    return {};
  },

  toJSON(_: UnsubscribeResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<UnsubscribeResult>, I>>(base?: I): UnsubscribeResult {
    return UnsubscribeResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UnsubscribeResult>, I>>(_: I): UnsubscribeResult {
    const message = createBaseUnsubscribeResult();
    return message;
  },
};

function createBaseDisconnect(): Disconnect {
  return { code: 0, reason: "" };
}

export const Disconnect = {
  encode(message: Disconnect, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.reason !== "") {
      writer.uint32(18).string(message.reason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Disconnect {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDisconnect();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.reason = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Disconnect {
    return {
      code: isSet(object.code) ? globalThis.Number(object.code) : 0,
      reason: isSet(object.reason) ? globalThis.String(object.reason) : "",
    };
  },

  toJSON(message: Disconnect): unknown {
    const obj: any = {};
    if (message.code !== 0) {
      obj.code = Math.round(message.code);
    }
    if (message.reason !== "") {
      obj.reason = message.reason;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Disconnect>, I>>(base?: I): Disconnect {
    return Disconnect.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Disconnect>, I>>(object: I): Disconnect {
    const message = createBaseDisconnect();
    message.code = object.code ?? 0;
    message.reason = object.reason ?? "";
    return message;
  },
};

function createBaseDisconnectRequest(): DisconnectRequest {
  return { user: "", disconnect: undefined, client: "", whitelist: [], session: "" };
}

export const DisconnectRequest = {
  encode(message: DisconnectRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    if (message.disconnect !== undefined) {
      Disconnect.encode(message.disconnect, writer.uint32(18).fork()).ldelim();
    }
    if (message.client !== "") {
      writer.uint32(26).string(message.client);
    }
    for (const v of message.whitelist) {
      writer.uint32(34).string(v!);
    }
    if (message.session !== "") {
      writer.uint32(42).string(message.session);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DisconnectRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDisconnectRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.disconnect = Disconnect.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.client = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.whitelist.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.session = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DisconnectRequest {
    return {
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      disconnect: isSet(object.disconnect) ? Disconnect.fromJSON(object.disconnect) : undefined,
      client: isSet(object.client) ? globalThis.String(object.client) : "",
      whitelist: globalThis.Array.isArray(object?.whitelist)
        ? object.whitelist.map((e: any) => globalThis.String(e))
        : [],
      session: isSet(object.session) ? globalThis.String(object.session) : "",
    };
  },

  toJSON(message: DisconnectRequest): unknown {
    const obj: any = {};
    if (message.user !== "") {
      obj.user = message.user;
    }
    if (message.disconnect !== undefined) {
      obj.disconnect = Disconnect.toJSON(message.disconnect);
    }
    if (message.client !== "") {
      obj.client = message.client;
    }
    if (message.whitelist?.length) {
      obj.whitelist = message.whitelist;
    }
    if (message.session !== "") {
      obj.session = message.session;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DisconnectRequest>, I>>(base?: I): DisconnectRequest {
    return DisconnectRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DisconnectRequest>, I>>(object: I): DisconnectRequest {
    const message = createBaseDisconnectRequest();
    message.user = object.user ?? "";
    message.disconnect = (object.disconnect !== undefined && object.disconnect !== null)
      ? Disconnect.fromPartial(object.disconnect)
      : undefined;
    message.client = object.client ?? "";
    message.whitelist = object.whitelist?.map((e) => e) || [];
    message.session = object.session ?? "";
    return message;
  },
};

function createBaseDisconnectResponse(): DisconnectResponse {
  return { error: undefined, result: undefined };
}

export const DisconnectResponse = {
  encode(message: DisconnectResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      DisconnectResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DisconnectResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDisconnectResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = DisconnectResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DisconnectResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? DisconnectResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: DisconnectResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = DisconnectResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DisconnectResponse>, I>>(base?: I): DisconnectResponse {
    return DisconnectResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DisconnectResponse>, I>>(object: I): DisconnectResponse {
    const message = createBaseDisconnectResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? DisconnectResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseDisconnectResult(): DisconnectResult {
  return {};
}

export const DisconnectResult = {
  encode(_: DisconnectResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DisconnectResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDisconnectResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): DisconnectResult {
    return {};
  },

  toJSON(_: DisconnectResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<DisconnectResult>, I>>(base?: I): DisconnectResult {
    return DisconnectResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DisconnectResult>, I>>(_: I): DisconnectResult {
    const message = createBaseDisconnectResult();
    return message;
  },
};

function createBasePresenceRequest(): PresenceRequest {
  return { channel: "" };
}

export const PresenceRequest = {
  encode(message: PresenceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel !== "") {
      writer.uint32(10).string(message.channel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PresenceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePresenceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PresenceRequest {
    return { channel: isSet(object.channel) ? globalThis.String(object.channel) : "" };
  },

  toJSON(message: PresenceRequest): unknown {
    const obj: any = {};
    if (message.channel !== "") {
      obj.channel = message.channel;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PresenceRequest>, I>>(base?: I): PresenceRequest {
    return PresenceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PresenceRequest>, I>>(object: I): PresenceRequest {
    const message = createBasePresenceRequest();
    message.channel = object.channel ?? "";
    return message;
  },
};

function createBasePresenceResponse(): PresenceResponse {
  return { error: undefined, result: undefined };
}

export const PresenceResponse = {
  encode(message: PresenceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      PresenceResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PresenceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePresenceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = PresenceResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PresenceResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? PresenceResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: PresenceResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = PresenceResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PresenceResponse>, I>>(base?: I): PresenceResponse {
    return PresenceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PresenceResponse>, I>>(object: I): PresenceResponse {
    const message = createBasePresenceResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? PresenceResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseClientInfo(): ClientInfo {
  return { user: "", client: "", connInfo: new Uint8Array(0), chanInfo: new Uint8Array(0) };
}

export const ClientInfo = {
  encode(message: ClientInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    if (message.client !== "") {
      writer.uint32(18).string(message.client);
    }
    if (message.connInfo.length !== 0) {
      writer.uint32(26).bytes(message.connInfo);
    }
    if (message.chanInfo.length !== 0) {
      writer.uint32(34).bytes(message.chanInfo);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClientInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.client = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.connInfo = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.chanInfo = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClientInfo {
    return {
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      client: isSet(object.client) ? globalThis.String(object.client) : "",
      connInfo: isSet(object.connInfo) ? bytesFromBase64(object.connInfo) : new Uint8Array(0),
      chanInfo: isSet(object.chanInfo) ? bytesFromBase64(object.chanInfo) : new Uint8Array(0),
    };
  },

  toJSON(message: ClientInfo): unknown {
    const obj: any = {};
    if (message.user !== "") {
      obj.user = message.user;
    }
    if (message.client !== "") {
      obj.client = message.client;
    }
    if (message.connInfo.length !== 0) {
      obj.connInfo = base64FromBytes(message.connInfo);
    }
    if (message.chanInfo.length !== 0) {
      obj.chanInfo = base64FromBytes(message.chanInfo);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClientInfo>, I>>(base?: I): ClientInfo {
    return ClientInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClientInfo>, I>>(object: I): ClientInfo {
    const message = createBaseClientInfo();
    message.user = object.user ?? "";
    message.client = object.client ?? "";
    message.connInfo = object.connInfo ?? new Uint8Array(0);
    message.chanInfo = object.chanInfo ?? new Uint8Array(0);
    return message;
  },
};

function createBasePresenceResult(): PresenceResult {
  return { presence: {} };
}

export const PresenceResult = {
  encode(message: PresenceResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.presence).forEach(([key, value]) => {
      PresenceResult_PresenceEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PresenceResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePresenceResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = PresenceResult_PresenceEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.presence[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PresenceResult {
    return {
      presence: isObject(object.presence)
        ? Object.entries(object.presence).reduce<{ [key: string]: ClientInfo }>((acc, [key, value]) => {
          acc[key] = ClientInfo.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: PresenceResult): unknown {
    const obj: any = {};
    if (message.presence) {
      const entries = Object.entries(message.presence);
      if (entries.length > 0) {
        obj.presence = {};
        entries.forEach(([k, v]) => {
          obj.presence[k] = ClientInfo.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PresenceResult>, I>>(base?: I): PresenceResult {
    return PresenceResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PresenceResult>, I>>(object: I): PresenceResult {
    const message = createBasePresenceResult();
    message.presence = Object.entries(object.presence ?? {}).reduce<{ [key: string]: ClientInfo }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = ClientInfo.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBasePresenceResult_PresenceEntry(): PresenceResult_PresenceEntry {
  return { key: "", value: undefined };
}

export const PresenceResult_PresenceEntry = {
  encode(message: PresenceResult_PresenceEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      ClientInfo.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PresenceResult_PresenceEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePresenceResult_PresenceEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = ClientInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PresenceResult_PresenceEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? ClientInfo.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: PresenceResult_PresenceEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = ClientInfo.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PresenceResult_PresenceEntry>, I>>(base?: I): PresenceResult_PresenceEntry {
    return PresenceResult_PresenceEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PresenceResult_PresenceEntry>, I>>(object: I): PresenceResult_PresenceEntry {
    const message = createBasePresenceResult_PresenceEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? ClientInfo.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBasePresenceStatsRequest(): PresenceStatsRequest {
  return { channel: "" };
}

export const PresenceStatsRequest = {
  encode(message: PresenceStatsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel !== "") {
      writer.uint32(10).string(message.channel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PresenceStatsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePresenceStatsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PresenceStatsRequest {
    return { channel: isSet(object.channel) ? globalThis.String(object.channel) : "" };
  },

  toJSON(message: PresenceStatsRequest): unknown {
    const obj: any = {};
    if (message.channel !== "") {
      obj.channel = message.channel;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PresenceStatsRequest>, I>>(base?: I): PresenceStatsRequest {
    return PresenceStatsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PresenceStatsRequest>, I>>(object: I): PresenceStatsRequest {
    const message = createBasePresenceStatsRequest();
    message.channel = object.channel ?? "";
    return message;
  },
};

function createBasePresenceStatsResponse(): PresenceStatsResponse {
  return { error: undefined, result: undefined };
}

export const PresenceStatsResponse = {
  encode(message: PresenceStatsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      PresenceStatsResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PresenceStatsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePresenceStatsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = PresenceStatsResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PresenceStatsResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? PresenceStatsResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: PresenceStatsResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = PresenceStatsResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PresenceStatsResponse>, I>>(base?: I): PresenceStatsResponse {
    return PresenceStatsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PresenceStatsResponse>, I>>(object: I): PresenceStatsResponse {
    const message = createBasePresenceStatsResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? PresenceStatsResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBasePresenceStatsResult(): PresenceStatsResult {
  return { numClients: 0, numUsers: 0 };
}

export const PresenceStatsResult = {
  encode(message: PresenceStatsResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.numClients !== 0) {
      writer.uint32(8).uint32(message.numClients);
    }
    if (message.numUsers !== 0) {
      writer.uint32(16).uint32(message.numUsers);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PresenceStatsResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePresenceStatsResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.numClients = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.numUsers = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PresenceStatsResult {
    return {
      numClients: isSet(object.numClients) ? globalThis.Number(object.numClients) : 0,
      numUsers: isSet(object.numUsers) ? globalThis.Number(object.numUsers) : 0,
    };
  },

  toJSON(message: PresenceStatsResult): unknown {
    const obj: any = {};
    if (message.numClients !== 0) {
      obj.numClients = Math.round(message.numClients);
    }
    if (message.numUsers !== 0) {
      obj.numUsers = Math.round(message.numUsers);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PresenceStatsResult>, I>>(base?: I): PresenceStatsResult {
    return PresenceStatsResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PresenceStatsResult>, I>>(object: I): PresenceStatsResult {
    const message = createBasePresenceStatsResult();
    message.numClients = object.numClients ?? 0;
    message.numUsers = object.numUsers ?? 0;
    return message;
  },
};

function createBaseStreamPosition(): StreamPosition {
  return { offset: 0, epoch: "" };
}

export const StreamPosition = {
  encode(message: StreamPosition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.offset !== 0) {
      writer.uint32(8).uint64(message.offset);
    }
    if (message.epoch !== "") {
      writer.uint32(18).string(message.epoch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamPosition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamPosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.epoch = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamPosition {
    return {
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0,
      epoch: isSet(object.epoch) ? globalThis.String(object.epoch) : "",
    };
  },

  toJSON(message: StreamPosition): unknown {
    const obj: any = {};
    if (message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    if (message.epoch !== "") {
      obj.epoch = message.epoch;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamPosition>, I>>(base?: I): StreamPosition {
    return StreamPosition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamPosition>, I>>(object: I): StreamPosition {
    const message = createBaseStreamPosition();
    message.offset = object.offset ?? 0;
    message.epoch = object.epoch ?? "";
    return message;
  },
};

function createBaseHistoryRequest(): HistoryRequest {
  return { channel: "", limit: 0, since: undefined, reverse: false };
}

export const HistoryRequest = {
  encode(message: HistoryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel !== "") {
      writer.uint32(10).string(message.channel);
    }
    if (message.limit !== 0) {
      writer.uint32(16).int32(message.limit);
    }
    if (message.since !== undefined) {
      StreamPosition.encode(message.since, writer.uint32(26).fork()).ldelim();
    }
    if (message.reverse !== false) {
      writer.uint32(32).bool(message.reverse);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HistoryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHistoryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.limit = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.since = StreamPosition.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.reverse = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HistoryRequest {
    return {
      channel: isSet(object.channel) ? globalThis.String(object.channel) : "",
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
      since: isSet(object.since) ? StreamPosition.fromJSON(object.since) : undefined,
      reverse: isSet(object.reverse) ? globalThis.Boolean(object.reverse) : false,
    };
  },

  toJSON(message: HistoryRequest): unknown {
    const obj: any = {};
    if (message.channel !== "") {
      obj.channel = message.channel;
    }
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    if (message.since !== undefined) {
      obj.since = StreamPosition.toJSON(message.since);
    }
    if (message.reverse !== false) {
      obj.reverse = message.reverse;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HistoryRequest>, I>>(base?: I): HistoryRequest {
    return HistoryRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HistoryRequest>, I>>(object: I): HistoryRequest {
    const message = createBaseHistoryRequest();
    message.channel = object.channel ?? "";
    message.limit = object.limit ?? 0;
    message.since = (object.since !== undefined && object.since !== null)
      ? StreamPosition.fromPartial(object.since)
      : undefined;
    message.reverse = object.reverse ?? false;
    return message;
  },
};

function createBaseHistoryResponse(): HistoryResponse {
  return { error: undefined, result: undefined };
}

export const HistoryResponse = {
  encode(message: HistoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      HistoryResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HistoryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHistoryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = HistoryResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HistoryResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? HistoryResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: HistoryResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = HistoryResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HistoryResponse>, I>>(base?: I): HistoryResponse {
    return HistoryResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HistoryResponse>, I>>(object: I): HistoryResponse {
    const message = createBaseHistoryResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? HistoryResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBasePublication(): Publication {
  return { data: new Uint8Array(0), info: undefined, offset: 0, tags: {} };
}

export const Publication = {
  encode(message: Publication, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.info !== undefined) {
      ClientInfo.encode(message.info, writer.uint32(26).fork()).ldelim();
    }
    if (message.offset !== 0) {
      writer.uint32(32).uint64(message.offset);
    }
    Object.entries(message.tags).forEach(([key, value]) => {
      Publication_TagsEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Publication {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublication();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.info = ClientInfo.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = Publication_TagsEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.tags[entry5.key] = entry5.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Publication {
    return {
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      info: isSet(object.info) ? ClientInfo.fromJSON(object.info) : undefined,
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0,
      tags: isObject(object.tags)
        ? Object.entries(object.tags).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Publication): unknown {
    const obj: any = {};
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.info !== undefined) {
      obj.info = ClientInfo.toJSON(message.info);
    }
    if (message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    if (message.tags) {
      const entries = Object.entries(message.tags);
      if (entries.length > 0) {
        obj.tags = {};
        entries.forEach(([k, v]) => {
          obj.tags[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Publication>, I>>(base?: I): Publication {
    return Publication.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Publication>, I>>(object: I): Publication {
    const message = createBasePublication();
    message.data = object.data ?? new Uint8Array(0);
    message.info = (object.info !== undefined && object.info !== null)
      ? ClientInfo.fromPartial(object.info)
      : undefined;
    message.offset = object.offset ?? 0;
    message.tags = Object.entries(object.tags ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBasePublication_TagsEntry(): Publication_TagsEntry {
  return { key: "", value: "" };
}

export const Publication_TagsEntry = {
  encode(message: Publication_TagsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Publication_TagsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublication_TagsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Publication_TagsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: Publication_TagsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Publication_TagsEntry>, I>>(base?: I): Publication_TagsEntry {
    return Publication_TagsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Publication_TagsEntry>, I>>(object: I): Publication_TagsEntry {
    const message = createBasePublication_TagsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseHistoryResult(): HistoryResult {
  return { publications: [], epoch: "", offset: 0 };
}

export const HistoryResult = {
  encode(message: HistoryResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.publications) {
      Publication.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.epoch !== "") {
      writer.uint32(18).string(message.epoch);
    }
    if (message.offset !== 0) {
      writer.uint32(24).uint64(message.offset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HistoryResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHistoryResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.publications.push(Publication.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.epoch = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HistoryResult {
    return {
      publications: globalThis.Array.isArray(object?.publications)
        ? object.publications.map((e: any) => Publication.fromJSON(e))
        : [],
      epoch: isSet(object.epoch) ? globalThis.String(object.epoch) : "",
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0,
    };
  },

  toJSON(message: HistoryResult): unknown {
    const obj: any = {};
    if (message.publications?.length) {
      obj.publications = message.publications.map((e) => Publication.toJSON(e));
    }
    if (message.epoch !== "") {
      obj.epoch = message.epoch;
    }
    if (message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HistoryResult>, I>>(base?: I): HistoryResult {
    return HistoryResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HistoryResult>, I>>(object: I): HistoryResult {
    const message = createBaseHistoryResult();
    message.publications = object.publications?.map((e) => Publication.fromPartial(e)) || [];
    message.epoch = object.epoch ?? "";
    message.offset = object.offset ?? 0;
    return message;
  },
};

function createBaseHistoryRemoveRequest(): HistoryRemoveRequest {
  return { channel: "" };
}

export const HistoryRemoveRequest = {
  encode(message: HistoryRemoveRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel !== "") {
      writer.uint32(10).string(message.channel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HistoryRemoveRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHistoryRemoveRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HistoryRemoveRequest {
    return { channel: isSet(object.channel) ? globalThis.String(object.channel) : "" };
  },

  toJSON(message: HistoryRemoveRequest): unknown {
    const obj: any = {};
    if (message.channel !== "") {
      obj.channel = message.channel;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HistoryRemoveRequest>, I>>(base?: I): HistoryRemoveRequest {
    return HistoryRemoveRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HistoryRemoveRequest>, I>>(object: I): HistoryRemoveRequest {
    const message = createBaseHistoryRemoveRequest();
    message.channel = object.channel ?? "";
    return message;
  },
};

function createBaseHistoryRemoveResponse(): HistoryRemoveResponse {
  return { error: undefined, result: undefined };
}

export const HistoryRemoveResponse = {
  encode(message: HistoryRemoveResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      HistoryRemoveResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HistoryRemoveResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHistoryRemoveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = HistoryRemoveResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HistoryRemoveResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? HistoryRemoveResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: HistoryRemoveResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = HistoryRemoveResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HistoryRemoveResponse>, I>>(base?: I): HistoryRemoveResponse {
    return HistoryRemoveResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HistoryRemoveResponse>, I>>(object: I): HistoryRemoveResponse {
    const message = createBaseHistoryRemoveResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? HistoryRemoveResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseHistoryRemoveResult(): HistoryRemoveResult {
  return {};
}

export const HistoryRemoveResult = {
  encode(_: HistoryRemoveResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HistoryRemoveResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHistoryRemoveResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): HistoryRemoveResult {
    return {};
  },

  toJSON(_: HistoryRemoveResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<HistoryRemoveResult>, I>>(base?: I): HistoryRemoveResult {
    return HistoryRemoveResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HistoryRemoveResult>, I>>(_: I): HistoryRemoveResult {
    const message = createBaseHistoryRemoveResult();
    return message;
  },
};

function createBaseInfoRequest(): InfoRequest {
  return {};
}

export const InfoRequest = {
  encode(_: InfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InfoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): InfoRequest {
    return {};
  },

  toJSON(_: InfoRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<InfoRequest>, I>>(base?: I): InfoRequest {
    return InfoRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InfoRequest>, I>>(_: I): InfoRequest {
    const message = createBaseInfoRequest();
    return message;
  },
};

function createBaseInfoResponse(): InfoResponse {
  return { error: undefined, result: undefined };
}

export const InfoResponse = {
  encode(message: InfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      InfoResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = InfoResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InfoResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? InfoResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: InfoResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = InfoResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InfoResponse>, I>>(base?: I): InfoResponse {
    return InfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InfoResponse>, I>>(object: I): InfoResponse {
    const message = createBaseInfoResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? InfoResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseInfoResult(): InfoResult {
  return { nodes: [] };
}

export const InfoResult = {
  encode(message: InfoResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.nodes) {
      NodeResult.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InfoResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfoResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodes.push(NodeResult.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InfoResult {
    return {
      nodes: globalThis.Array.isArray(object?.nodes) ? object.nodes.map((e: any) => NodeResult.fromJSON(e)) : [],
    };
  },

  toJSON(message: InfoResult): unknown {
    const obj: any = {};
    if (message.nodes?.length) {
      obj.nodes = message.nodes.map((e) => NodeResult.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InfoResult>, I>>(base?: I): InfoResult {
    return InfoResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InfoResult>, I>>(object: I): InfoResult {
    const message = createBaseInfoResult();
    message.nodes = object.nodes?.map((e) => NodeResult.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRPCRequest(): RPCRequest {
  return { method: "", params: new Uint8Array(0) };
}

export const RPCRequest = {
  encode(message: RPCRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.method !== "") {
      writer.uint32(10).string(message.method);
    }
    if (message.params.length !== 0) {
      writer.uint32(18).bytes(message.params);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RPCRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRPCRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.method = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.params = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RPCRequest {
    return {
      method: isSet(object.method) ? globalThis.String(object.method) : "",
      params: isSet(object.params) ? bytesFromBase64(object.params) : new Uint8Array(0),
    };
  },

  toJSON(message: RPCRequest): unknown {
    const obj: any = {};
    if (message.method !== "") {
      obj.method = message.method;
    }
    if (message.params.length !== 0) {
      obj.params = base64FromBytes(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RPCRequest>, I>>(base?: I): RPCRequest {
    return RPCRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RPCRequest>, I>>(object: I): RPCRequest {
    const message = createBaseRPCRequest();
    message.method = object.method ?? "";
    message.params = object.params ?? new Uint8Array(0);
    return message;
  },
};

function createBaseRPCResponse(): RPCResponse {
  return { error: undefined, result: undefined };
}

export const RPCResponse = {
  encode(message: RPCResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      RPCResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RPCResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRPCResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = RPCResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RPCResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? RPCResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: RPCResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = RPCResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RPCResponse>, I>>(base?: I): RPCResponse {
    return RPCResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RPCResponse>, I>>(object: I): RPCResponse {
    const message = createBaseRPCResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? RPCResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseRPCResult(): RPCResult {
  return { data: new Uint8Array(0) };
}

export const RPCResult = {
  encode(message: RPCResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RPCResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRPCResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RPCResult {
    return { data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0) };
  },

  toJSON(message: RPCResult): unknown {
    const obj: any = {};
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RPCResult>, I>>(base?: I): RPCResult {
    return RPCResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RPCResult>, I>>(object: I): RPCResult {
    const message = createBaseRPCResult();
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseRefreshRequest(): RefreshRequest {
  return { user: "", client: "", expired: false, expireAt: 0, info: new Uint8Array(0), session: "" };
}

export const RefreshRequest = {
  encode(message: RefreshRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    if (message.client !== "") {
      writer.uint32(18).string(message.client);
    }
    if (message.expired !== false) {
      writer.uint32(24).bool(message.expired);
    }
    if (message.expireAt !== 0) {
      writer.uint32(32).int64(message.expireAt);
    }
    if (message.info.length !== 0) {
      writer.uint32(42).bytes(message.info);
    }
    if (message.session !== "") {
      writer.uint32(50).string(message.session);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefreshRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefreshRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.client = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.expired = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.expireAt = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.info = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.session = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RefreshRequest {
    return {
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      client: isSet(object.client) ? globalThis.String(object.client) : "",
      expired: isSet(object.expired) ? globalThis.Boolean(object.expired) : false,
      expireAt: isSet(object.expireAt) ? globalThis.Number(object.expireAt) : 0,
      info: isSet(object.info) ? bytesFromBase64(object.info) : new Uint8Array(0),
      session: isSet(object.session) ? globalThis.String(object.session) : "",
    };
  },

  toJSON(message: RefreshRequest): unknown {
    const obj: any = {};
    if (message.user !== "") {
      obj.user = message.user;
    }
    if (message.client !== "") {
      obj.client = message.client;
    }
    if (message.expired !== false) {
      obj.expired = message.expired;
    }
    if (message.expireAt !== 0) {
      obj.expireAt = Math.round(message.expireAt);
    }
    if (message.info.length !== 0) {
      obj.info = base64FromBytes(message.info);
    }
    if (message.session !== "") {
      obj.session = message.session;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RefreshRequest>, I>>(base?: I): RefreshRequest {
    return RefreshRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RefreshRequest>, I>>(object: I): RefreshRequest {
    const message = createBaseRefreshRequest();
    message.user = object.user ?? "";
    message.client = object.client ?? "";
    message.expired = object.expired ?? false;
    message.expireAt = object.expireAt ?? 0;
    message.info = object.info ?? new Uint8Array(0);
    message.session = object.session ?? "";
    return message;
  },
};

function createBaseRefreshResponse(): RefreshResponse {
  return { error: undefined, result: undefined };
}

export const RefreshResponse = {
  encode(message: RefreshResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      RefreshResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefreshResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefreshResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = RefreshResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RefreshResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? RefreshResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: RefreshResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = RefreshResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RefreshResponse>, I>>(base?: I): RefreshResponse {
    return RefreshResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RefreshResponse>, I>>(object: I): RefreshResponse {
    const message = createBaseRefreshResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? RefreshResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseRefreshResult(): RefreshResult {
  return {};
}

export const RefreshResult = {
  encode(_: RefreshResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefreshResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefreshResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): RefreshResult {
    return {};
  },

  toJSON(_: RefreshResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RefreshResult>, I>>(base?: I): RefreshResult {
    return RefreshResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RefreshResult>, I>>(_: I): RefreshResult {
    const message = createBaseRefreshResult();
    return message;
  },
};

function createBaseNodeResult(): NodeResult {
  return {
    uid: "",
    name: "",
    version: "",
    numClients: 0,
    numUsers: 0,
    numChannels: 0,
    uptime: 0,
    metrics: undefined,
    process: undefined,
    numSubs: 0,
  };
}

export const NodeResult = {
  encode(message: NodeResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uid !== "") {
      writer.uint32(10).string(message.uid);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    if (message.numClients !== 0) {
      writer.uint32(32).uint32(message.numClients);
    }
    if (message.numUsers !== 0) {
      writer.uint32(40).uint32(message.numUsers);
    }
    if (message.numChannels !== 0) {
      writer.uint32(48).uint32(message.numChannels);
    }
    if (message.uptime !== 0) {
      writer.uint32(56).uint32(message.uptime);
    }
    if (message.metrics !== undefined) {
      Metrics.encode(message.metrics, writer.uint32(66).fork()).ldelim();
    }
    if (message.process !== undefined) {
      Process.encode(message.process, writer.uint32(74).fork()).ldelim();
    }
    if (message.numSubs !== 0) {
      writer.uint32(80).uint32(message.numSubs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.version = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.numClients = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.numUsers = reader.uint32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.numChannels = reader.uint32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.uptime = reader.uint32();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.metrics = Metrics.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.process = Process.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.numSubs = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NodeResult {
    return {
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      version: isSet(object.version) ? globalThis.String(object.version) : "",
      numClients: isSet(object.numClients) ? globalThis.Number(object.numClients) : 0,
      numUsers: isSet(object.numUsers) ? globalThis.Number(object.numUsers) : 0,
      numChannels: isSet(object.numChannels) ? globalThis.Number(object.numChannels) : 0,
      uptime: isSet(object.uptime) ? globalThis.Number(object.uptime) : 0,
      metrics: isSet(object.metrics) ? Metrics.fromJSON(object.metrics) : undefined,
      process: isSet(object.process) ? Process.fromJSON(object.process) : undefined,
      numSubs: isSet(object.numSubs) ? globalThis.Number(object.numSubs) : 0,
    };
  },

  toJSON(message: NodeResult): unknown {
    const obj: any = {};
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    if (message.numClients !== 0) {
      obj.numClients = Math.round(message.numClients);
    }
    if (message.numUsers !== 0) {
      obj.numUsers = Math.round(message.numUsers);
    }
    if (message.numChannels !== 0) {
      obj.numChannels = Math.round(message.numChannels);
    }
    if (message.uptime !== 0) {
      obj.uptime = Math.round(message.uptime);
    }
    if (message.metrics !== undefined) {
      obj.metrics = Metrics.toJSON(message.metrics);
    }
    if (message.process !== undefined) {
      obj.process = Process.toJSON(message.process);
    }
    if (message.numSubs !== 0) {
      obj.numSubs = Math.round(message.numSubs);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NodeResult>, I>>(base?: I): NodeResult {
    return NodeResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NodeResult>, I>>(object: I): NodeResult {
    const message = createBaseNodeResult();
    message.uid = object.uid ?? "";
    message.name = object.name ?? "";
    message.version = object.version ?? "";
    message.numClients = object.numClients ?? 0;
    message.numUsers = object.numUsers ?? 0;
    message.numChannels = object.numChannels ?? 0;
    message.uptime = object.uptime ?? 0;
    message.metrics = (object.metrics !== undefined && object.metrics !== null)
      ? Metrics.fromPartial(object.metrics)
      : undefined;
    message.process = (object.process !== undefined && object.process !== null)
      ? Process.fromPartial(object.process)
      : undefined;
    message.numSubs = object.numSubs ?? 0;
    return message;
  },
};

function createBaseMetrics(): Metrics {
  return { interval: 0, items: {} };
}

export const Metrics = {
  encode(message: Metrics, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.interval !== 0) {
      writer.uint32(9).double(message.interval);
    }
    Object.entries(message.items).forEach(([key, value]) => {
      Metrics_ItemsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Metrics {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetrics();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.interval = reader.double();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = Metrics_ItemsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.items[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Metrics {
    return {
      interval: isSet(object.interval) ? globalThis.Number(object.interval) : 0,
      items: isObject(object.items)
        ? Object.entries(object.items).reduce<{ [key: string]: number }>((acc, [key, value]) => {
          acc[key] = Number(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Metrics): unknown {
    const obj: any = {};
    if (message.interval !== 0) {
      obj.interval = message.interval;
    }
    if (message.items) {
      const entries = Object.entries(message.items);
      if (entries.length > 0) {
        obj.items = {};
        entries.forEach(([k, v]) => {
          obj.items[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Metrics>, I>>(base?: I): Metrics {
    return Metrics.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Metrics>, I>>(object: I): Metrics {
    const message = createBaseMetrics();
    message.interval = object.interval ?? 0;
    message.items = Object.entries(object.items ?? {}).reduce<{ [key: string]: number }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.Number(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseMetrics_ItemsEntry(): Metrics_ItemsEntry {
  return { key: "", value: 0 };
}

export const Metrics_ItemsEntry = {
  encode(message: Metrics_ItemsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Metrics_ItemsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetrics_ItemsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.value = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Metrics_ItemsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: Metrics_ItemsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== 0) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Metrics_ItemsEntry>, I>>(base?: I): Metrics_ItemsEntry {
    return Metrics_ItemsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Metrics_ItemsEntry>, I>>(object: I): Metrics_ItemsEntry {
    const message = createBaseMetrics_ItemsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseProcess(): Process {
  return { cpu: 0, rss: 0 };
}

export const Process = {
  encode(message: Process, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cpu !== 0) {
      writer.uint32(9).double(message.cpu);
    }
    if (message.rss !== 0) {
      writer.uint32(16).int64(message.rss);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Process {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcess();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.cpu = reader.double();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.rss = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Process {
    return {
      cpu: isSet(object.cpu) ? globalThis.Number(object.cpu) : 0,
      rss: isSet(object.rss) ? globalThis.Number(object.rss) : 0,
    };
  },

  toJSON(message: Process): unknown {
    const obj: any = {};
    if (message.cpu !== 0) {
      obj.cpu = message.cpu;
    }
    if (message.rss !== 0) {
      obj.rss = Math.round(message.rss);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Process>, I>>(base?: I): Process {
    return Process.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Process>, I>>(object: I): Process {
    const message = createBaseProcess();
    message.cpu = object.cpu ?? 0;
    message.rss = object.rss ?? 0;
    return message;
  },
};

function createBaseChannelsRequest(): ChannelsRequest {
  return { pattern: "" };
}

export const ChannelsRequest = {
  encode(message: ChannelsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pattern !== "") {
      writer.uint32(10).string(message.pattern);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pattern = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChannelsRequest {
    return { pattern: isSet(object.pattern) ? globalThis.String(object.pattern) : "" };
  },

  toJSON(message: ChannelsRequest): unknown {
    const obj: any = {};
    if (message.pattern !== "") {
      obj.pattern = message.pattern;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelsRequest>, I>>(base?: I): ChannelsRequest {
    return ChannelsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChannelsRequest>, I>>(object: I): ChannelsRequest {
    const message = createBaseChannelsRequest();
    message.pattern = object.pattern ?? "";
    return message;
  },
};

function createBaseChannelsResponse(): ChannelsResponse {
  return { error: undefined, result: undefined };
}

export const ChannelsResponse = {
  encode(message: ChannelsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      ChannelsResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = ChannelsResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChannelsResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? ChannelsResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: ChannelsResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = ChannelsResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelsResponse>, I>>(base?: I): ChannelsResponse {
    return ChannelsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChannelsResponse>, I>>(object: I): ChannelsResponse {
    const message = createBaseChannelsResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? ChannelsResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseChannelsResult(): ChannelsResult {
  return { channels: {} };
}

export const ChannelsResult = {
  encode(message: ChannelsResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.channels).forEach(([key, value]) => {
      ChannelsResult_ChannelsEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelsResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelsResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = ChannelsResult_ChannelsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.channels[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChannelsResult {
    return {
      channels: isObject(object.channels)
        ? Object.entries(object.channels).reduce<{ [key: string]: ChannelInfo }>((acc, [key, value]) => {
          acc[key] = ChannelInfo.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ChannelsResult): unknown {
    const obj: any = {};
    if (message.channels) {
      const entries = Object.entries(message.channels);
      if (entries.length > 0) {
        obj.channels = {};
        entries.forEach(([k, v]) => {
          obj.channels[k] = ChannelInfo.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelsResult>, I>>(base?: I): ChannelsResult {
    return ChannelsResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChannelsResult>, I>>(object: I): ChannelsResult {
    const message = createBaseChannelsResult();
    message.channels = Object.entries(object.channels ?? {}).reduce<{ [key: string]: ChannelInfo }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = ChannelInfo.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseChannelsResult_ChannelsEntry(): ChannelsResult_ChannelsEntry {
  return { key: "", value: undefined };
}

export const ChannelsResult_ChannelsEntry = {
  encode(message: ChannelsResult_ChannelsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      ChannelInfo.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelsResult_ChannelsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelsResult_ChannelsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = ChannelInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChannelsResult_ChannelsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? ChannelInfo.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ChannelsResult_ChannelsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = ChannelInfo.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelsResult_ChannelsEntry>, I>>(base?: I): ChannelsResult_ChannelsEntry {
    return ChannelsResult_ChannelsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChannelsResult_ChannelsEntry>, I>>(object: I): ChannelsResult_ChannelsEntry {
    const message = createBaseChannelsResult_ChannelsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? ChannelInfo.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseChannelInfo(): ChannelInfo {
  return { numClients: 0 };
}

export const ChannelInfo = {
  encode(message: ChannelInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.numClients !== 0) {
      writer.uint32(8).uint32(message.numClients);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.numClients = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChannelInfo {
    return { numClients: isSet(object.numClients) ? globalThis.Number(object.numClients) : 0 };
  },

  toJSON(message: ChannelInfo): unknown {
    const obj: any = {};
    if (message.numClients !== 0) {
      obj.numClients = Math.round(message.numClients);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelInfo>, I>>(base?: I): ChannelInfo {
    return ChannelInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChannelInfo>, I>>(object: I): ChannelInfo {
    const message = createBaseChannelInfo();
    message.numClients = object.numClients ?? 0;
    return message;
  },
};

function createBaseConnectionsRequest(): ConnectionsRequest {
  return { user: "", expression: "" };
}

export const ConnectionsRequest = {
  encode(message: ConnectionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    if (message.expression !== "") {
      writer.uint32(18).string(message.expression);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.expression = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConnectionsRequest {
    return {
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      expression: isSet(object.expression) ? globalThis.String(object.expression) : "",
    };
  },

  toJSON(message: ConnectionsRequest): unknown {
    const obj: any = {};
    if (message.user !== "") {
      obj.user = message.user;
    }
    if (message.expression !== "") {
      obj.expression = message.expression;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectionsRequest>, I>>(base?: I): ConnectionsRequest {
    return ConnectionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectionsRequest>, I>>(object: I): ConnectionsRequest {
    const message = createBaseConnectionsRequest();
    message.user = object.user ?? "";
    message.expression = object.expression ?? "";
    return message;
  },
};

function createBaseConnectionsResponse(): ConnectionsResponse {
  return { error: undefined, result: undefined };
}

export const ConnectionsResponse = {
  encode(message: ConnectionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      ConnectionsResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = ConnectionsResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConnectionsResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? ConnectionsResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: ConnectionsResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = ConnectionsResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectionsResponse>, I>>(base?: I): ConnectionsResponse {
    return ConnectionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectionsResponse>, I>>(object: I): ConnectionsResponse {
    const message = createBaseConnectionsResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? ConnectionsResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseConnectionsResult(): ConnectionsResult {
  return { connections: {} };
}

export const ConnectionsResult = {
  encode(message: ConnectionsResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.connections).forEach(([key, value]) => {
      ConnectionsResult_ConnectionsEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionsResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectionsResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = ConnectionsResult_ConnectionsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.connections[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConnectionsResult {
    return {
      connections: isObject(object.connections)
        ? Object.entries(object.connections).reduce<{ [key: string]: ConnectionInfo }>((acc, [key, value]) => {
          acc[key] = ConnectionInfo.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ConnectionsResult): unknown {
    const obj: any = {};
    if (message.connections) {
      const entries = Object.entries(message.connections);
      if (entries.length > 0) {
        obj.connections = {};
        entries.forEach(([k, v]) => {
          obj.connections[k] = ConnectionInfo.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectionsResult>, I>>(base?: I): ConnectionsResult {
    return ConnectionsResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectionsResult>, I>>(object: I): ConnectionsResult {
    const message = createBaseConnectionsResult();
    message.connections = Object.entries(object.connections ?? {}).reduce<{ [key: string]: ConnectionInfo }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = ConnectionInfo.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseConnectionsResult_ConnectionsEntry(): ConnectionsResult_ConnectionsEntry {
  return { key: "", value: undefined };
}

export const ConnectionsResult_ConnectionsEntry = {
  encode(message: ConnectionsResult_ConnectionsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      ConnectionInfo.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionsResult_ConnectionsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectionsResult_ConnectionsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = ConnectionInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConnectionsResult_ConnectionsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? ConnectionInfo.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ConnectionsResult_ConnectionsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = ConnectionInfo.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectionsResult_ConnectionsEntry>, I>>(
    base?: I,
  ): ConnectionsResult_ConnectionsEntry {
    return ConnectionsResult_ConnectionsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectionsResult_ConnectionsEntry>, I>>(
    object: I,
  ): ConnectionsResult_ConnectionsEntry {
    const message = createBaseConnectionsResult_ConnectionsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? ConnectionInfo.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseConnectionInfo(): ConnectionInfo {
  return { appName: "", appVersion: "", transport: "", protocol: "", user: "", state: undefined };
}

export const ConnectionInfo = {
  encode(message: ConnectionInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.appName !== "") {
      writer.uint32(10).string(message.appName);
    }
    if (message.appVersion !== "") {
      writer.uint32(18).string(message.appVersion);
    }
    if (message.transport !== "") {
      writer.uint32(26).string(message.transport);
    }
    if (message.protocol !== "") {
      writer.uint32(34).string(message.protocol);
    }
    if (message.user !== "") {
      writer.uint32(66).string(message.user);
    }
    if (message.state !== undefined) {
      ConnectionState.encode(message.state, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectionInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.appName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.appVersion = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.transport = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.protocol = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.user = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.state = ConnectionState.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConnectionInfo {
    return {
      appName: isSet(object.appName) ? globalThis.String(object.appName) : "",
      appVersion: isSet(object.appVersion) ? globalThis.String(object.appVersion) : "",
      transport: isSet(object.transport) ? globalThis.String(object.transport) : "",
      protocol: isSet(object.protocol) ? globalThis.String(object.protocol) : "",
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      state: isSet(object.state) ? ConnectionState.fromJSON(object.state) : undefined,
    };
  },

  toJSON(message: ConnectionInfo): unknown {
    const obj: any = {};
    if (message.appName !== "") {
      obj.appName = message.appName;
    }
    if (message.appVersion !== "") {
      obj.appVersion = message.appVersion;
    }
    if (message.transport !== "") {
      obj.transport = message.transport;
    }
    if (message.protocol !== "") {
      obj.protocol = message.protocol;
    }
    if (message.user !== "") {
      obj.user = message.user;
    }
    if (message.state !== undefined) {
      obj.state = ConnectionState.toJSON(message.state);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectionInfo>, I>>(base?: I): ConnectionInfo {
    return ConnectionInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectionInfo>, I>>(object: I): ConnectionInfo {
    const message = createBaseConnectionInfo();
    message.appName = object.appName ?? "";
    message.appVersion = object.appVersion ?? "";
    message.transport = object.transport ?? "";
    message.protocol = object.protocol ?? "";
    message.user = object.user ?? "";
    message.state = (object.state !== undefined && object.state !== null)
      ? ConnectionState.fromPartial(object.state)
      : undefined;
    return message;
  },
};

function createBaseConnectionState(): ConnectionState {
  return { channels: {}, connectionToken: undefined, subscriptionTokens: {}, meta: new Uint8Array(0) };
}

export const ConnectionState = {
  encode(message: ConnectionState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.channels).forEach(([key, value]) => {
      ConnectionState_ChannelsEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    if (message.connectionToken !== undefined) {
      ConnectionTokenInfo.encode(message.connectionToken, writer.uint32(18).fork()).ldelim();
    }
    Object.entries(message.subscriptionTokens).forEach(([key, value]) => {
      ConnectionState_SubscriptionTokensEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    if (message.meta.length !== 0) {
      writer.uint32(34).bytes(message.meta);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectionState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = ConnectionState_ChannelsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.channels[entry1.key] = entry1.value;
          }
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.connectionToken = ConnectionTokenInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = ConnectionState_SubscriptionTokensEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.subscriptionTokens[entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.meta = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConnectionState {
    return {
      channels: isObject(object.channels)
        ? Object.entries(object.channels).reduce<{ [key: string]: ChannelContext }>((acc, [key, value]) => {
          acc[key] = ChannelContext.fromJSON(value);
          return acc;
        }, {})
        : {},
      connectionToken: isSet(object.connectionToken) ? ConnectionTokenInfo.fromJSON(object.connectionToken) : undefined,
      subscriptionTokens: isObject(object.subscriptionTokens)
        ? Object.entries(object.subscriptionTokens).reduce<{ [key: string]: SubscriptionTokenInfo }>(
          (acc, [key, value]) => {
            acc[key] = SubscriptionTokenInfo.fromJSON(value);
            return acc;
          },
          {},
        )
        : {},
      meta: isSet(object.meta) ? bytesFromBase64(object.meta) : new Uint8Array(0),
    };
  },

  toJSON(message: ConnectionState): unknown {
    const obj: any = {};
    if (message.channels) {
      const entries = Object.entries(message.channels);
      if (entries.length > 0) {
        obj.channels = {};
        entries.forEach(([k, v]) => {
          obj.channels[k] = ChannelContext.toJSON(v);
        });
      }
    }
    if (message.connectionToken !== undefined) {
      obj.connectionToken = ConnectionTokenInfo.toJSON(message.connectionToken);
    }
    if (message.subscriptionTokens) {
      const entries = Object.entries(message.subscriptionTokens);
      if (entries.length > 0) {
        obj.subscriptionTokens = {};
        entries.forEach(([k, v]) => {
          obj.subscriptionTokens[k] = SubscriptionTokenInfo.toJSON(v);
        });
      }
    }
    if (message.meta.length !== 0) {
      obj.meta = base64FromBytes(message.meta);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectionState>, I>>(base?: I): ConnectionState {
    return ConnectionState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectionState>, I>>(object: I): ConnectionState {
    const message = createBaseConnectionState();
    message.channels = Object.entries(object.channels ?? {}).reduce<{ [key: string]: ChannelContext }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = ChannelContext.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.connectionToken = (object.connectionToken !== undefined && object.connectionToken !== null)
      ? ConnectionTokenInfo.fromPartial(object.connectionToken)
      : undefined;
    message.subscriptionTokens = Object.entries(object.subscriptionTokens ?? {}).reduce<
      { [key: string]: SubscriptionTokenInfo }
    >((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = SubscriptionTokenInfo.fromPartial(value);
      }
      return acc;
    }, {});
    message.meta = object.meta ?? new Uint8Array(0);
    return message;
  },
};

function createBaseConnectionState_ChannelsEntry(): ConnectionState_ChannelsEntry {
  return { key: "", value: undefined };
}

export const ConnectionState_ChannelsEntry = {
  encode(message: ConnectionState_ChannelsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      ChannelContext.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionState_ChannelsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectionState_ChannelsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = ChannelContext.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConnectionState_ChannelsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? ChannelContext.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ConnectionState_ChannelsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = ChannelContext.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectionState_ChannelsEntry>, I>>(base?: I): ConnectionState_ChannelsEntry {
    return ConnectionState_ChannelsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectionState_ChannelsEntry>, I>>(
    object: I,
  ): ConnectionState_ChannelsEntry {
    const message = createBaseConnectionState_ChannelsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? ChannelContext.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseConnectionState_SubscriptionTokensEntry(): ConnectionState_SubscriptionTokensEntry {
  return { key: "", value: undefined };
}

export const ConnectionState_SubscriptionTokensEntry = {
  encode(message: ConnectionState_SubscriptionTokensEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      SubscriptionTokenInfo.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionState_SubscriptionTokensEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectionState_SubscriptionTokensEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = SubscriptionTokenInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConnectionState_SubscriptionTokensEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? SubscriptionTokenInfo.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ConnectionState_SubscriptionTokensEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = SubscriptionTokenInfo.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectionState_SubscriptionTokensEntry>, I>>(
    base?: I,
  ): ConnectionState_SubscriptionTokensEntry {
    return ConnectionState_SubscriptionTokensEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectionState_SubscriptionTokensEntry>, I>>(
    object: I,
  ): ConnectionState_SubscriptionTokensEntry {
    const message = createBaseConnectionState_SubscriptionTokensEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? SubscriptionTokenInfo.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseChannelContext(): ChannelContext {
  return { source: 0 };
}

export const ChannelContext = {
  encode(message: ChannelContext, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== 0) {
      writer.uint32(8).uint32(message.source);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelContext {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelContext();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.source = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChannelContext {
    return { source: isSet(object.source) ? globalThis.Number(object.source) : 0 };
  },

  toJSON(message: ChannelContext): unknown {
    const obj: any = {};
    if (message.source !== 0) {
      obj.source = Math.round(message.source);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChannelContext>, I>>(base?: I): ChannelContext {
    return ChannelContext.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChannelContext>, I>>(object: I): ChannelContext {
    const message = createBaseChannelContext();
    message.source = object.source ?? 0;
    return message;
  },
};

function createBaseConnectionTokenInfo(): ConnectionTokenInfo {
  return { uid: "", issuedAt: 0 };
}

export const ConnectionTokenInfo = {
  encode(message: ConnectionTokenInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uid !== "") {
      writer.uint32(10).string(message.uid);
    }
    if (message.issuedAt !== 0) {
      writer.uint32(16).int64(message.issuedAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionTokenInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectionTokenInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uid = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.issuedAt = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConnectionTokenInfo {
    return {
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
      issuedAt: isSet(object.issuedAt) ? globalThis.Number(object.issuedAt) : 0,
    };
  },

  toJSON(message: ConnectionTokenInfo): unknown {
    const obj: any = {};
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    if (message.issuedAt !== 0) {
      obj.issuedAt = Math.round(message.issuedAt);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectionTokenInfo>, I>>(base?: I): ConnectionTokenInfo {
    return ConnectionTokenInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectionTokenInfo>, I>>(object: I): ConnectionTokenInfo {
    const message = createBaseConnectionTokenInfo();
    message.uid = object.uid ?? "";
    message.issuedAt = object.issuedAt ?? 0;
    return message;
  },
};

function createBaseSubscriptionTokenInfo(): SubscriptionTokenInfo {
  return { uid: "", issuedAt: 0 };
}

export const SubscriptionTokenInfo = {
  encode(message: SubscriptionTokenInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uid !== "") {
      writer.uint32(10).string(message.uid);
    }
    if (message.issuedAt !== 0) {
      writer.uint32(16).int64(message.issuedAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionTokenInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionTokenInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uid = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.issuedAt = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscriptionTokenInfo {
    return {
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
      issuedAt: isSet(object.issuedAt) ? globalThis.Number(object.issuedAt) : 0,
    };
  },

  toJSON(message: SubscriptionTokenInfo): unknown {
    const obj: any = {};
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    if (message.issuedAt !== 0) {
      obj.issuedAt = Math.round(message.issuedAt);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscriptionTokenInfo>, I>>(base?: I): SubscriptionTokenInfo {
    return SubscriptionTokenInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscriptionTokenInfo>, I>>(object: I): SubscriptionTokenInfo {
    const message = createBaseSubscriptionTokenInfo();
    message.uid = object.uid ?? "";
    message.issuedAt = object.issuedAt ?? 0;
    return message;
  },
};

function createBaseUpdateUserStatusRequest(): UpdateUserStatusRequest {
  return { users: [], state: "" };
}

export const UpdateUserStatusRequest = {
  encode(message: UpdateUserStatusRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.users) {
      writer.uint32(10).string(v!);
    }
    if (message.state !== "") {
      writer.uint32(18).string(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUserStatusRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.users.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.state = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateUserStatusRequest {
    return {
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => globalThis.String(e)) : [],
      state: isSet(object.state) ? globalThis.String(object.state) : "",
    };
  },

  toJSON(message: UpdateUserStatusRequest): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users;
    }
    if (message.state !== "") {
      obj.state = message.state;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateUserStatusRequest>, I>>(base?: I): UpdateUserStatusRequest {
    return UpdateUserStatusRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateUserStatusRequest>, I>>(object: I): UpdateUserStatusRequest {
    const message = createBaseUpdateUserStatusRequest();
    message.users = object.users?.map((e) => e) || [];
    message.state = object.state ?? "";
    return message;
  },
};

function createBaseUpdateUserStatusResponse(): UpdateUserStatusResponse {
  return { error: undefined, result: undefined };
}

export const UpdateUserStatusResponse = {
  encode(message: UpdateUserStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      UpdateUserStatusResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUserStatusResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = UpdateUserStatusResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateUserStatusResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? UpdateUserStatusResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: UpdateUserStatusResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = UpdateUserStatusResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateUserStatusResponse>, I>>(base?: I): UpdateUserStatusResponse {
    return UpdateUserStatusResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateUserStatusResponse>, I>>(object: I): UpdateUserStatusResponse {
    const message = createBaseUpdateUserStatusResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? UpdateUserStatusResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseUpdateUserStatusResult(): UpdateUserStatusResult {
  return {};
}

export const UpdateUserStatusResult = {
  encode(_: UpdateUserStatusResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUserStatusResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserStatusResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): UpdateUserStatusResult {
    return {};
  },

  toJSON(_: UpdateUserStatusResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateUserStatusResult>, I>>(base?: I): UpdateUserStatusResult {
    return UpdateUserStatusResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateUserStatusResult>, I>>(_: I): UpdateUserStatusResult {
    const message = createBaseUpdateUserStatusResult();
    return message;
  },
};

function createBaseGetUserStatusRequest(): GetUserStatusRequest {
  return { users: [] };
}

export const GetUserStatusRequest = {
  encode(message: GetUserStatusRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.users) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserStatusRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.users.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetUserStatusRequest {
    return { users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => globalThis.String(e)) : [] };
  },

  toJSON(message: GetUserStatusRequest): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUserStatusRequest>, I>>(base?: I): GetUserStatusRequest {
    return GetUserStatusRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetUserStatusRequest>, I>>(object: I): GetUserStatusRequest {
    const message = createBaseGetUserStatusRequest();
    message.users = object.users?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetUserStatusResponse(): GetUserStatusResponse {
  return { error: undefined, result: undefined };
}

export const GetUserStatusResponse = {
  encode(message: GetUserStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      GetUserStatusResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserStatusResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = GetUserStatusResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetUserStatusResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? GetUserStatusResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: GetUserStatusResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = GetUserStatusResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUserStatusResponse>, I>>(base?: I): GetUserStatusResponse {
    return GetUserStatusResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetUserStatusResponse>, I>>(object: I): GetUserStatusResponse {
    const message = createBaseGetUserStatusResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? GetUserStatusResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseGetUserStatusResult(): GetUserStatusResult {
  return { statuses: [] };
}

export const GetUserStatusResult = {
  encode(message: GetUserStatusResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.statuses) {
      UserStatus.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserStatusResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserStatusResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.statuses.push(UserStatus.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetUserStatusResult {
    return {
      statuses: globalThis.Array.isArray(object?.statuses)
        ? object.statuses.map((e: any) => UserStatus.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetUserStatusResult): unknown {
    const obj: any = {};
    if (message.statuses?.length) {
      obj.statuses = message.statuses.map((e) => UserStatus.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUserStatusResult>, I>>(base?: I): GetUserStatusResult {
    return GetUserStatusResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetUserStatusResult>, I>>(object: I): GetUserStatusResult {
    const message = createBaseGetUserStatusResult();
    message.statuses = object.statuses?.map((e) => UserStatus.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUserStatus(): UserStatus {
  return { user: "", active: 0, online: 0, state: "" };
}

export const UserStatus = {
  encode(message: UserStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    if (message.active !== 0) {
      writer.uint32(16).int64(message.active);
    }
    if (message.online !== 0) {
      writer.uint32(24).int64(message.online);
    }
    if (message.state !== "") {
      writer.uint32(34).string(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.active = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.online = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.state = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserStatus {
    return {
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      active: isSet(object.active) ? globalThis.Number(object.active) : 0,
      online: isSet(object.online) ? globalThis.Number(object.online) : 0,
      state: isSet(object.state) ? globalThis.String(object.state) : "",
    };
  },

  toJSON(message: UserStatus): unknown {
    const obj: any = {};
    if (message.user !== "") {
      obj.user = message.user;
    }
    if (message.active !== 0) {
      obj.active = Math.round(message.active);
    }
    if (message.online !== 0) {
      obj.online = Math.round(message.online);
    }
    if (message.state !== "") {
      obj.state = message.state;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserStatus>, I>>(base?: I): UserStatus {
    return UserStatus.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserStatus>, I>>(object: I): UserStatus {
    const message = createBaseUserStatus();
    message.user = object.user ?? "";
    message.active = object.active ?? 0;
    message.online = object.online ?? 0;
    message.state = object.state ?? "";
    return message;
  },
};

function createBaseDeleteUserStatusRequest(): DeleteUserStatusRequest {
  return { users: [] };
}

export const DeleteUserStatusRequest = {
  encode(message: DeleteUserStatusRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.users) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteUserStatusRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteUserStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.users.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteUserStatusRequest {
    return { users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => globalThis.String(e)) : [] };
  },

  toJSON(message: DeleteUserStatusRequest): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteUserStatusRequest>, I>>(base?: I): DeleteUserStatusRequest {
    return DeleteUserStatusRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteUserStatusRequest>, I>>(object: I): DeleteUserStatusRequest {
    const message = createBaseDeleteUserStatusRequest();
    message.users = object.users?.map((e) => e) || [];
    return message;
  },
};

function createBaseDeleteUserStatusResponse(): DeleteUserStatusResponse {
  return { error: undefined, result: undefined };
}

export const DeleteUserStatusResponse = {
  encode(message: DeleteUserStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      DeleteUserStatusResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteUserStatusResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteUserStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = DeleteUserStatusResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteUserStatusResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? DeleteUserStatusResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: DeleteUserStatusResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = DeleteUserStatusResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteUserStatusResponse>, I>>(base?: I): DeleteUserStatusResponse {
    return DeleteUserStatusResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteUserStatusResponse>, I>>(object: I): DeleteUserStatusResponse {
    const message = createBaseDeleteUserStatusResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? DeleteUserStatusResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseDeleteUserStatusResult(): DeleteUserStatusResult {
  return {};
}

export const DeleteUserStatusResult = {
  encode(_: DeleteUserStatusResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteUserStatusResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteUserStatusResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): DeleteUserStatusResult {
    return {};
  },

  toJSON(_: DeleteUserStatusResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteUserStatusResult>, I>>(base?: I): DeleteUserStatusResult {
    return DeleteUserStatusResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteUserStatusResult>, I>>(_: I): DeleteUserStatusResult {
    const message = createBaseDeleteUserStatusResult();
    return message;
  },
};

function createBaseBlockUserRequest(): BlockUserRequest {
  return { expireAt: 0, user: "" };
}

export const BlockUserRequest = {
  encode(message: BlockUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.expireAt !== 0) {
      writer.uint32(8).int64(message.expireAt);
    }
    if (message.user !== "") {
      writer.uint32(18).string(message.user);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.expireAt = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.user = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockUserRequest {
    return {
      expireAt: isSet(object.expireAt) ? globalThis.Number(object.expireAt) : 0,
      user: isSet(object.user) ? globalThis.String(object.user) : "",
    };
  },

  toJSON(message: BlockUserRequest): unknown {
    const obj: any = {};
    if (message.expireAt !== 0) {
      obj.expireAt = Math.round(message.expireAt);
    }
    if (message.user !== "") {
      obj.user = message.user;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockUserRequest>, I>>(base?: I): BlockUserRequest {
    return BlockUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlockUserRequest>, I>>(object: I): BlockUserRequest {
    const message = createBaseBlockUserRequest();
    message.expireAt = object.expireAt ?? 0;
    message.user = object.user ?? "";
    return message;
  },
};

function createBaseBlockUserResult(): BlockUserResult {
  return {};
}

export const BlockUserResult = {
  encode(_: BlockUserResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockUserResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockUserResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): BlockUserResult {
    return {};
  },

  toJSON(_: BlockUserResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockUserResult>, I>>(base?: I): BlockUserResult {
    return BlockUserResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlockUserResult>, I>>(_: I): BlockUserResult {
    const message = createBaseBlockUserResult();
    return message;
  },
};

function createBaseBlockUserResponse(): BlockUserResponse {
  return { error: undefined, result: undefined };
}

export const BlockUserResponse = {
  encode(message: BlockUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      BlockUserResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = BlockUserResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockUserResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? BlockUserResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: BlockUserResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = BlockUserResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockUserResponse>, I>>(base?: I): BlockUserResponse {
    return BlockUserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlockUserResponse>, I>>(object: I): BlockUserResponse {
    const message = createBaseBlockUserResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? BlockUserResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseUnblockUserRequest(): UnblockUserRequest {
  return { user: "" };
}

export const UnblockUserRequest = {
  encode(message: UnblockUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnblockUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnblockUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UnblockUserRequest {
    return { user: isSet(object.user) ? globalThis.String(object.user) : "" };
  },

  toJSON(message: UnblockUserRequest): unknown {
    const obj: any = {};
    if (message.user !== "") {
      obj.user = message.user;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UnblockUserRequest>, I>>(base?: I): UnblockUserRequest {
    return UnblockUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UnblockUserRequest>, I>>(object: I): UnblockUserRequest {
    const message = createBaseUnblockUserRequest();
    message.user = object.user ?? "";
    return message;
  },
};

function createBaseUnblockUserResult(): UnblockUserResult {
  return {};
}

export const UnblockUserResult = {
  encode(_: UnblockUserResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnblockUserResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnblockUserResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): UnblockUserResult {
    return {};
  },

  toJSON(_: UnblockUserResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<UnblockUserResult>, I>>(base?: I): UnblockUserResult {
    return UnblockUserResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UnblockUserResult>, I>>(_: I): UnblockUserResult {
    const message = createBaseUnblockUserResult();
    return message;
  },
};

function createBaseUnblockUserResponse(): UnblockUserResponse {
  return { error: undefined, result: undefined };
}

export const UnblockUserResponse = {
  encode(message: UnblockUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      UnblockUserResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnblockUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnblockUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = UnblockUserResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UnblockUserResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? UnblockUserResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: UnblockUserResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = UnblockUserResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UnblockUserResponse>, I>>(base?: I): UnblockUserResponse {
    return UnblockUserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UnblockUserResponse>, I>>(object: I): UnblockUserResponse {
    const message = createBaseUnblockUserResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? UnblockUserResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseRevokeTokenRequest(): RevokeTokenRequest {
  return { expireAt: 0, uid: "" };
}

export const RevokeTokenRequest = {
  encode(message: RevokeTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.expireAt !== 0) {
      writer.uint32(8).int64(message.expireAt);
    }
    if (message.uid !== "") {
      writer.uint32(18).string(message.uid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.expireAt = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.uid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RevokeTokenRequest {
    return {
      expireAt: isSet(object.expireAt) ? globalThis.Number(object.expireAt) : 0,
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
    };
  },

  toJSON(message: RevokeTokenRequest): unknown {
    const obj: any = {};
    if (message.expireAt !== 0) {
      obj.expireAt = Math.round(message.expireAt);
    }
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokeTokenRequest>, I>>(base?: I): RevokeTokenRequest {
    return RevokeTokenRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevokeTokenRequest>, I>>(object: I): RevokeTokenRequest {
    const message = createBaseRevokeTokenRequest();
    message.expireAt = object.expireAt ?? 0;
    message.uid = object.uid ?? "";
    return message;
  },
};

function createBaseRevokeTokenResult(): RevokeTokenResult {
  return {};
}

export const RevokeTokenResult = {
  encode(_: RevokeTokenResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeTokenResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeTokenResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): RevokeTokenResult {
    return {};
  },

  toJSON(_: RevokeTokenResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokeTokenResult>, I>>(base?: I): RevokeTokenResult {
    return RevokeTokenResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevokeTokenResult>, I>>(_: I): RevokeTokenResult {
    const message = createBaseRevokeTokenResult();
    return message;
  },
};

function createBaseRevokeTokenResponse(): RevokeTokenResponse {
  return { error: undefined, result: undefined };
}

export const RevokeTokenResponse = {
  encode(message: RevokeTokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      RevokeTokenResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeTokenResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = RevokeTokenResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RevokeTokenResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? RevokeTokenResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: RevokeTokenResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = RevokeTokenResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokeTokenResponse>, I>>(base?: I): RevokeTokenResponse {
    return RevokeTokenResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevokeTokenResponse>, I>>(object: I): RevokeTokenResponse {
    const message = createBaseRevokeTokenResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? RevokeTokenResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseInvalidateUserTokensRequest(): InvalidateUserTokensRequest {
  return { expireAt: 0, user: "", issuedBefore: 0, channel: "" };
}

export const InvalidateUserTokensRequest = {
  encode(message: InvalidateUserTokensRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.expireAt !== 0) {
      writer.uint32(8).int64(message.expireAt);
    }
    if (message.user !== "") {
      writer.uint32(18).string(message.user);
    }
    if (message.issuedBefore !== 0) {
      writer.uint32(24).int64(message.issuedBefore);
    }
    if (message.channel !== "") {
      writer.uint32(34).string(message.channel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvalidateUserTokensRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvalidateUserTokensRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.expireAt = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.user = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.issuedBefore = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.channel = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InvalidateUserTokensRequest {
    return {
      expireAt: isSet(object.expireAt) ? globalThis.Number(object.expireAt) : 0,
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      issuedBefore: isSet(object.issuedBefore) ? globalThis.Number(object.issuedBefore) : 0,
      channel: isSet(object.channel) ? globalThis.String(object.channel) : "",
    };
  },

  toJSON(message: InvalidateUserTokensRequest): unknown {
    const obj: any = {};
    if (message.expireAt !== 0) {
      obj.expireAt = Math.round(message.expireAt);
    }
    if (message.user !== "") {
      obj.user = message.user;
    }
    if (message.issuedBefore !== 0) {
      obj.issuedBefore = Math.round(message.issuedBefore);
    }
    if (message.channel !== "") {
      obj.channel = message.channel;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InvalidateUserTokensRequest>, I>>(base?: I): InvalidateUserTokensRequest {
    return InvalidateUserTokensRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InvalidateUserTokensRequest>, I>>(object: I): InvalidateUserTokensRequest {
    const message = createBaseInvalidateUserTokensRequest();
    message.expireAt = object.expireAt ?? 0;
    message.user = object.user ?? "";
    message.issuedBefore = object.issuedBefore ?? 0;
    message.channel = object.channel ?? "";
    return message;
  },
};

function createBaseInvalidateUserTokensResult(): InvalidateUserTokensResult {
  return {};
}

export const InvalidateUserTokensResult = {
  encode(_: InvalidateUserTokensResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvalidateUserTokensResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvalidateUserTokensResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): InvalidateUserTokensResult {
    return {};
  },

  toJSON(_: InvalidateUserTokensResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<InvalidateUserTokensResult>, I>>(base?: I): InvalidateUserTokensResult {
    return InvalidateUserTokensResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InvalidateUserTokensResult>, I>>(_: I): InvalidateUserTokensResult {
    const message = createBaseInvalidateUserTokensResult();
    return message;
  },
};

function createBaseInvalidateUserTokensResponse(): InvalidateUserTokensResponse {
  return { error: undefined, result: undefined };
}

export const InvalidateUserTokensResponse = {
  encode(message: InvalidateUserTokensResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      InvalidateUserTokensResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvalidateUserTokensResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvalidateUserTokensResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = InvalidateUserTokensResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InvalidateUserTokensResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? InvalidateUserTokensResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: InvalidateUserTokensResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = InvalidateUserTokensResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InvalidateUserTokensResponse>, I>>(base?: I): InvalidateUserTokensResponse {
    return InvalidateUserTokensResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InvalidateUserTokensResponse>, I>>(object: I): InvalidateUserTokensResponse {
    const message = createBaseInvalidateUserTokensResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? InvalidateUserTokensResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseDeviceRegisterRequest(): DeviceRegisterRequest {
  return { id: "", provider: "", token: "", platform: "", user: "", meta: {}, topics: [], timezone: "", language: "" };
}

export const DeviceRegisterRequest = {
  encode(message: DeviceRegisterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.provider !== "") {
      writer.uint32(18).string(message.provider);
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    if (message.platform !== "") {
      writer.uint32(34).string(message.platform);
    }
    if (message.user !== "") {
      writer.uint32(42).string(message.user);
    }
    Object.entries(message.meta).forEach(([key, value]) => {
      DeviceRegisterRequest_MetaEntry.encode({ key: key as any, value }, writer.uint32(50).fork()).ldelim();
    });
    for (const v of message.topics) {
      writer.uint32(58).string(v!);
    }
    if (message.timezone !== "") {
      writer.uint32(66).string(message.timezone);
    }
    if (message.language !== "") {
      writer.uint32(74).string(message.language);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceRegisterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceRegisterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.provider = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.token = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.platform = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.user = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          const entry6 = DeviceRegisterRequest_MetaEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.meta[entry6.key] = entry6.value;
          }
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.topics.push(reader.string());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.timezone = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.language = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceRegisterRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      provider: isSet(object.provider) ? globalThis.String(object.provider) : "",
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      platform: isSet(object.platform) ? globalThis.String(object.platform) : "",
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      meta: isObject(object.meta)
        ? Object.entries(object.meta).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      topics: globalThis.Array.isArray(object?.topics) ? object.topics.map((e: any) => globalThis.String(e)) : [],
      timezone: isSet(object.timezone) ? globalThis.String(object.timezone) : "",
      language: isSet(object.language) ? globalThis.String(object.language) : "",
    };
  },

  toJSON(message: DeviceRegisterRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.provider !== "") {
      obj.provider = message.provider;
    }
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.platform !== "") {
      obj.platform = message.platform;
    }
    if (message.user !== "") {
      obj.user = message.user;
    }
    if (message.meta) {
      const entries = Object.entries(message.meta);
      if (entries.length > 0) {
        obj.meta = {};
        entries.forEach(([k, v]) => {
          obj.meta[k] = v;
        });
      }
    }
    if (message.topics?.length) {
      obj.topics = message.topics;
    }
    if (message.timezone !== "") {
      obj.timezone = message.timezone;
    }
    if (message.language !== "") {
      obj.language = message.language;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceRegisterRequest>, I>>(base?: I): DeviceRegisterRequest {
    return DeviceRegisterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceRegisterRequest>, I>>(object: I): DeviceRegisterRequest {
    const message = createBaseDeviceRegisterRequest();
    message.id = object.id ?? "";
    message.provider = object.provider ?? "";
    message.token = object.token ?? "";
    message.platform = object.platform ?? "";
    message.user = object.user ?? "";
    message.meta = Object.entries(object.meta ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    message.topics = object.topics?.map((e) => e) || [];
    message.timezone = object.timezone ?? "";
    message.language = object.language ?? "";
    return message;
  },
};

function createBaseDeviceRegisterRequest_MetaEntry(): DeviceRegisterRequest_MetaEntry {
  return { key: "", value: "" };
}

export const DeviceRegisterRequest_MetaEntry = {
  encode(message: DeviceRegisterRequest_MetaEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceRegisterRequest_MetaEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceRegisterRequest_MetaEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceRegisterRequest_MetaEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: DeviceRegisterRequest_MetaEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceRegisterRequest_MetaEntry>, I>>(base?: I): DeviceRegisterRequest_MetaEntry {
    return DeviceRegisterRequest_MetaEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceRegisterRequest_MetaEntry>, I>>(
    object: I,
  ): DeviceRegisterRequest_MetaEntry {
    const message = createBaseDeviceRegisterRequest_MetaEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDeviceUpdateRequest(): DeviceUpdateRequest {
  return {
    ids: [],
    users: [],
    userUpdate: undefined,
    metaUpdate: undefined,
    topicsUpdate: undefined,
    timezoneUpdate: undefined,
    languageUpdate: undefined,
  };
}

export const DeviceUpdateRequest = {
  encode(message: DeviceUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.users) {
      writer.uint32(18).string(v!);
    }
    if (message.userUpdate !== undefined) {
      DeviceUserUpdate.encode(message.userUpdate, writer.uint32(34).fork()).ldelim();
    }
    if (message.metaUpdate !== undefined) {
      DeviceMetaUpdate.encode(message.metaUpdate, writer.uint32(42).fork()).ldelim();
    }
    if (message.topicsUpdate !== undefined) {
      DeviceTopicsUpdate.encode(message.topicsUpdate, writer.uint32(50).fork()).ldelim();
    }
    if (message.timezoneUpdate !== undefined) {
      DeviceTimezoneUpdate.encode(message.timezoneUpdate, writer.uint32(58).fork()).ldelim();
    }
    if (message.languageUpdate !== undefined) {
      DeviceLanguageUpdate.encode(message.languageUpdate, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceUpdateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ids.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.users.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.userUpdate = DeviceUserUpdate.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.metaUpdate = DeviceMetaUpdate.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.topicsUpdate = DeviceTopicsUpdate.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.timezoneUpdate = DeviceTimezoneUpdate.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.languageUpdate = DeviceLanguageUpdate.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceUpdateRequest {
    return {
      ids: globalThis.Array.isArray(object?.ids) ? object.ids.map((e: any) => globalThis.String(e)) : [],
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => globalThis.String(e)) : [],
      userUpdate: isSet(object.userUpdate) ? DeviceUserUpdate.fromJSON(object.userUpdate) : undefined,
      metaUpdate: isSet(object.metaUpdate) ? DeviceMetaUpdate.fromJSON(object.metaUpdate) : undefined,
      topicsUpdate: isSet(object.topicsUpdate) ? DeviceTopicsUpdate.fromJSON(object.topicsUpdate) : undefined,
      timezoneUpdate: isSet(object.timezoneUpdate) ? DeviceTimezoneUpdate.fromJSON(object.timezoneUpdate) : undefined,
      languageUpdate: isSet(object.languageUpdate) ? DeviceLanguageUpdate.fromJSON(object.languageUpdate) : undefined,
    };
  },

  toJSON(message: DeviceUpdateRequest): unknown {
    const obj: any = {};
    if (message.ids?.length) {
      obj.ids = message.ids;
    }
    if (message.users?.length) {
      obj.users = message.users;
    }
    if (message.userUpdate !== undefined) {
      obj.userUpdate = DeviceUserUpdate.toJSON(message.userUpdate);
    }
    if (message.metaUpdate !== undefined) {
      obj.metaUpdate = DeviceMetaUpdate.toJSON(message.metaUpdate);
    }
    if (message.topicsUpdate !== undefined) {
      obj.topicsUpdate = DeviceTopicsUpdate.toJSON(message.topicsUpdate);
    }
    if (message.timezoneUpdate !== undefined) {
      obj.timezoneUpdate = DeviceTimezoneUpdate.toJSON(message.timezoneUpdate);
    }
    if (message.languageUpdate !== undefined) {
      obj.languageUpdate = DeviceLanguageUpdate.toJSON(message.languageUpdate);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceUpdateRequest>, I>>(base?: I): DeviceUpdateRequest {
    return DeviceUpdateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceUpdateRequest>, I>>(object: I): DeviceUpdateRequest {
    const message = createBaseDeviceUpdateRequest();
    message.ids = object.ids?.map((e) => e) || [];
    message.users = object.users?.map((e) => e) || [];
    message.userUpdate = (object.userUpdate !== undefined && object.userUpdate !== null)
      ? DeviceUserUpdate.fromPartial(object.userUpdate)
      : undefined;
    message.metaUpdate = (object.metaUpdate !== undefined && object.metaUpdate !== null)
      ? DeviceMetaUpdate.fromPartial(object.metaUpdate)
      : undefined;
    message.topicsUpdate = (object.topicsUpdate !== undefined && object.topicsUpdate !== null)
      ? DeviceTopicsUpdate.fromPartial(object.topicsUpdate)
      : undefined;
    message.timezoneUpdate = (object.timezoneUpdate !== undefined && object.timezoneUpdate !== null)
      ? DeviceTimezoneUpdate.fromPartial(object.timezoneUpdate)
      : undefined;
    message.languageUpdate = (object.languageUpdate !== undefined && object.languageUpdate !== null)
      ? DeviceLanguageUpdate.fromPartial(object.languageUpdate)
      : undefined;
    return message;
  },
};

function createBaseDeviceRemoveRequest(): DeviceRemoveRequest {
  return { ids: [], users: [] };
}

export const DeviceRemoveRequest = {
  encode(message: DeviceRemoveRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.users) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceRemoveRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceRemoveRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ids.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.users.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceRemoveRequest {
    return {
      ids: globalThis.Array.isArray(object?.ids) ? object.ids.map((e: any) => globalThis.String(e)) : [],
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: DeviceRemoveRequest): unknown {
    const obj: any = {};
    if (message.ids?.length) {
      obj.ids = message.ids;
    }
    if (message.users?.length) {
      obj.users = message.users;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceRemoveRequest>, I>>(base?: I): DeviceRemoveRequest {
    return DeviceRemoveRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceRemoveRequest>, I>>(object: I): DeviceRemoveRequest {
    const message = createBaseDeviceRemoveRequest();
    message.ids = object.ids?.map((e) => e) || [];
    message.users = object.users?.map((e) => e) || [];
    return message;
  },
};

function createBaseDeviceUserUpdate(): DeviceUserUpdate {
  return { user: "" };
}

export const DeviceUserUpdate = {
  encode(message: DeviceUserUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceUserUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceUserUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceUserUpdate {
    return { user: isSet(object.user) ? globalThis.String(object.user) : "" };
  },

  toJSON(message: DeviceUserUpdate): unknown {
    const obj: any = {};
    if (message.user !== "") {
      obj.user = message.user;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceUserUpdate>, I>>(base?: I): DeviceUserUpdate {
    return DeviceUserUpdate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceUserUpdate>, I>>(object: I): DeviceUserUpdate {
    const message = createBaseDeviceUserUpdate();
    message.user = object.user ?? "";
    return message;
  },
};

function createBaseDeviceTimezoneUpdate(): DeviceTimezoneUpdate {
  return { timezone: "" };
}

export const DeviceTimezoneUpdate = {
  encode(message: DeviceTimezoneUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timezone !== "") {
      writer.uint32(10).string(message.timezone);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceTimezoneUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceTimezoneUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.timezone = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceTimezoneUpdate {
    return { timezone: isSet(object.timezone) ? globalThis.String(object.timezone) : "" };
  },

  toJSON(message: DeviceTimezoneUpdate): unknown {
    const obj: any = {};
    if (message.timezone !== "") {
      obj.timezone = message.timezone;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceTimezoneUpdate>, I>>(base?: I): DeviceTimezoneUpdate {
    return DeviceTimezoneUpdate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceTimezoneUpdate>, I>>(object: I): DeviceTimezoneUpdate {
    const message = createBaseDeviceTimezoneUpdate();
    message.timezone = object.timezone ?? "";
    return message;
  },
};

function createBaseDeviceLanguageUpdate(): DeviceLanguageUpdate {
  return { language: "" };
}

export const DeviceLanguageUpdate = {
  encode(message: DeviceLanguageUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.language !== "") {
      writer.uint32(10).string(message.language);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceLanguageUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceLanguageUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.language = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceLanguageUpdate {
    return { language: isSet(object.language) ? globalThis.String(object.language) : "" };
  },

  toJSON(message: DeviceLanguageUpdate): unknown {
    const obj: any = {};
    if (message.language !== "") {
      obj.language = message.language;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceLanguageUpdate>, I>>(base?: I): DeviceLanguageUpdate {
    return DeviceLanguageUpdate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceLanguageUpdate>, I>>(object: I): DeviceLanguageUpdate {
    const message = createBaseDeviceLanguageUpdate();
    message.language = object.language ?? "";
    return message;
  },
};

function createBaseDeviceMetaUpdate(): DeviceMetaUpdate {
  return { meta: {} };
}

export const DeviceMetaUpdate = {
  encode(message: DeviceMetaUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.meta).forEach(([key, value]) => {
      DeviceMetaUpdate_MetaEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceMetaUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceMetaUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = DeviceMetaUpdate_MetaEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.meta[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceMetaUpdate {
    return {
      meta: isObject(object.meta)
        ? Object.entries(object.meta).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: DeviceMetaUpdate): unknown {
    const obj: any = {};
    if (message.meta) {
      const entries = Object.entries(message.meta);
      if (entries.length > 0) {
        obj.meta = {};
        entries.forEach(([k, v]) => {
          obj.meta[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceMetaUpdate>, I>>(base?: I): DeviceMetaUpdate {
    return DeviceMetaUpdate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceMetaUpdate>, I>>(object: I): DeviceMetaUpdate {
    const message = createBaseDeviceMetaUpdate();
    message.meta = Object.entries(object.meta ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseDeviceMetaUpdate_MetaEntry(): DeviceMetaUpdate_MetaEntry {
  return { key: "", value: "" };
}

export const DeviceMetaUpdate_MetaEntry = {
  encode(message: DeviceMetaUpdate_MetaEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceMetaUpdate_MetaEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceMetaUpdate_MetaEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceMetaUpdate_MetaEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: DeviceMetaUpdate_MetaEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceMetaUpdate_MetaEntry>, I>>(base?: I): DeviceMetaUpdate_MetaEntry {
    return DeviceMetaUpdate_MetaEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceMetaUpdate_MetaEntry>, I>>(object: I): DeviceMetaUpdate_MetaEntry {
    const message = createBaseDeviceMetaUpdate_MetaEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDeviceTopicsUpdate(): DeviceTopicsUpdate {
  return { op: "", topics: [] };
}

export const DeviceTopicsUpdate = {
  encode(message: DeviceTopicsUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.op !== "") {
      writer.uint32(10).string(message.op);
    }
    for (const v of message.topics) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceTopicsUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceTopicsUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.op = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.topics.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceTopicsUpdate {
    return {
      op: isSet(object.op) ? globalThis.String(object.op) : "",
      topics: globalThis.Array.isArray(object?.topics) ? object.topics.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: DeviceTopicsUpdate): unknown {
    const obj: any = {};
    if (message.op !== "") {
      obj.op = message.op;
    }
    if (message.topics?.length) {
      obj.topics = message.topics;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceTopicsUpdate>, I>>(base?: I): DeviceTopicsUpdate {
    return DeviceTopicsUpdate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceTopicsUpdate>, I>>(object: I): DeviceTopicsUpdate {
    const message = createBaseDeviceTopicsUpdate();
    message.op = object.op ?? "";
    message.topics = object.topics?.map((e) => e) || [];
    return message;
  },
};

function createBaseDeviceFilter(): DeviceFilter {
  return { ids: [], users: [], topics: [], providers: [], platforms: [] };
}

export const DeviceFilter = {
  encode(message: DeviceFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.users) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.topics) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.providers) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.platforms) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ids.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.users.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.topics.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.providers.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.platforms.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceFilter {
    return {
      ids: globalThis.Array.isArray(object?.ids) ? object.ids.map((e: any) => globalThis.String(e)) : [],
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => globalThis.String(e)) : [],
      topics: globalThis.Array.isArray(object?.topics) ? object.topics.map((e: any) => globalThis.String(e)) : [],
      providers: globalThis.Array.isArray(object?.providers)
        ? object.providers.map((e: any) => globalThis.String(e))
        : [],
      platforms: globalThis.Array.isArray(object?.platforms)
        ? object.platforms.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: DeviceFilter): unknown {
    const obj: any = {};
    if (message.ids?.length) {
      obj.ids = message.ids;
    }
    if (message.users?.length) {
      obj.users = message.users;
    }
    if (message.topics?.length) {
      obj.topics = message.topics;
    }
    if (message.providers?.length) {
      obj.providers = message.providers;
    }
    if (message.platforms?.length) {
      obj.platforms = message.platforms;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceFilter>, I>>(base?: I): DeviceFilter {
    return DeviceFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceFilter>, I>>(object: I): DeviceFilter {
    const message = createBaseDeviceFilter();
    message.ids = object.ids?.map((e) => e) || [];
    message.users = object.users?.map((e) => e) || [];
    message.topics = object.topics?.map((e) => e) || [];
    message.providers = object.providers?.map((e) => e) || [];
    message.platforms = object.platforms?.map((e) => e) || [];
    return message;
  },
};

function createBaseDeviceListRequest(): DeviceListRequest {
  return {
    filter: undefined,
    includeTotalCount: false,
    includeMeta: false,
    includeTopics: false,
    cursor: "",
    limit: 0,
  };
}

export const DeviceListRequest = {
  encode(message: DeviceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      DeviceFilter.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    if (message.includeTotalCount !== false) {
      writer.uint32(16).bool(message.includeTotalCount);
    }
    if (message.includeMeta !== false) {
      writer.uint32(24).bool(message.includeMeta);
    }
    if (message.includeTopics !== false) {
      writer.uint32(32).bool(message.includeTopics);
    }
    if (message.cursor !== "") {
      writer.uint32(82).string(message.cursor);
    }
    if (message.limit !== 0) {
      writer.uint32(88).int32(message.limit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filter = DeviceFilter.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.includeTotalCount = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.includeMeta = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.includeTopics = reader.bool();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.cursor = reader.string();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.limit = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceListRequest {
    return {
      filter: isSet(object.filter) ? DeviceFilter.fromJSON(object.filter) : undefined,
      includeTotalCount: isSet(object.includeTotalCount) ? globalThis.Boolean(object.includeTotalCount) : false,
      includeMeta: isSet(object.includeMeta) ? globalThis.Boolean(object.includeMeta) : false,
      includeTopics: isSet(object.includeTopics) ? globalThis.Boolean(object.includeTopics) : false,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
    };
  },

  toJSON(message: DeviceListRequest): unknown {
    const obj: any = {};
    if (message.filter !== undefined) {
      obj.filter = DeviceFilter.toJSON(message.filter);
    }
    if (message.includeTotalCount !== false) {
      obj.includeTotalCount = message.includeTotalCount;
    }
    if (message.includeMeta !== false) {
      obj.includeMeta = message.includeMeta;
    }
    if (message.includeTopics !== false) {
      obj.includeTopics = message.includeTopics;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceListRequest>, I>>(base?: I): DeviceListRequest {
    return DeviceListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceListRequest>, I>>(object: I): DeviceListRequest {
    const message = createBaseDeviceListRequest();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? DeviceFilter.fromPartial(object.filter)
      : undefined;
    message.includeTotalCount = object.includeTotalCount ?? false;
    message.includeMeta = object.includeMeta ?? false;
    message.includeTopics = object.includeTopics ?? false;
    message.cursor = object.cursor ?? "";
    message.limit = object.limit ?? 0;
    return message;
  },
};

function createBaseDeviceTopicFilter(): DeviceTopicFilter {
  return { deviceIds: [], deviceProviders: [], devicePlatforms: [], deviceUsers: [], topics: [], topicPrefix: "" };
}

export const DeviceTopicFilter = {
  encode(message: DeviceTopicFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.deviceIds) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.deviceProviders) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.devicePlatforms) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.deviceUsers) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.topics) {
      writer.uint32(42).string(v!);
    }
    if (message.topicPrefix !== "") {
      writer.uint32(50).string(message.topicPrefix);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceTopicFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceTopicFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.deviceIds.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.deviceProviders.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.devicePlatforms.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.deviceUsers.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.topics.push(reader.string());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.topicPrefix = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceTopicFilter {
    return {
      deviceIds: globalThis.Array.isArray(object?.deviceIds)
        ? object.deviceIds.map((e: any) => globalThis.String(e))
        : [],
      deviceProviders: globalThis.Array.isArray(object?.deviceProviders)
        ? object.deviceProviders.map((e: any) => globalThis.String(e))
        : [],
      devicePlatforms: globalThis.Array.isArray(object?.devicePlatforms)
        ? object.devicePlatforms.map((e: any) => globalThis.String(e))
        : [],
      deviceUsers: globalThis.Array.isArray(object?.deviceUsers)
        ? object.deviceUsers.map((e: any) => globalThis.String(e))
        : [],
      topics: globalThis.Array.isArray(object?.topics)
        ? object.topics.map((e: any) => globalThis.String(e))
        : [],
      topicPrefix: isSet(object.topicPrefix) ? globalThis.String(object.topicPrefix) : "",
    };
  },

  toJSON(message: DeviceTopicFilter): unknown {
    const obj: any = {};
    if (message.deviceIds?.length) {
      obj.deviceIds = message.deviceIds;
    }
    if (message.deviceProviders?.length) {
      obj.deviceProviders = message.deviceProviders;
    }
    if (message.devicePlatforms?.length) {
      obj.devicePlatforms = message.devicePlatforms;
    }
    if (message.deviceUsers?.length) {
      obj.deviceUsers = message.deviceUsers;
    }
    if (message.topics?.length) {
      obj.topics = message.topics;
    }
    if (message.topicPrefix !== "") {
      obj.topicPrefix = message.topicPrefix;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceTopicFilter>, I>>(base?: I): DeviceTopicFilter {
    return DeviceTopicFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceTopicFilter>, I>>(object: I): DeviceTopicFilter {
    const message = createBaseDeviceTopicFilter();
    message.deviceIds = object.deviceIds?.map((e) => e) || [];
    message.deviceProviders = object.deviceProviders?.map((e) => e) || [];
    message.devicePlatforms = object.devicePlatforms?.map((e) => e) || [];
    message.deviceUsers = object.deviceUsers?.map((e) => e) || [];
    message.topics = object.topics?.map((e) => e) || [];
    message.topicPrefix = object.topicPrefix ?? "";
    return message;
  },
};

function createBaseDeviceTopicListRequest(): DeviceTopicListRequest {
  return { filter: undefined, includeTotalCount: false, includeDevice: false, cursor: "", limit: 0 };
}

export const DeviceTopicListRequest = {
  encode(message: DeviceTopicListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      DeviceTopicFilter.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    if (message.includeTotalCount !== false) {
      writer.uint32(16).bool(message.includeTotalCount);
    }
    if (message.includeDevice !== false) {
      writer.uint32(24).bool(message.includeDevice);
    }
    if (message.cursor !== "") {
      writer.uint32(82).string(message.cursor);
    }
    if (message.limit !== 0) {
      writer.uint32(88).int32(message.limit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceTopicListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceTopicListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filter = DeviceTopicFilter.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.includeTotalCount = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.includeDevice = reader.bool();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.cursor = reader.string();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.limit = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceTopicListRequest {
    return {
      filter: isSet(object.filter) ? DeviceTopicFilter.fromJSON(object.filter) : undefined,
      includeTotalCount: isSet(object.includeTotalCount) ? globalThis.Boolean(object.includeTotalCount) : false,
      includeDevice: isSet(object.includeDevice) ? globalThis.Boolean(object.includeDevice) : false,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
    };
  },

  toJSON(message: DeviceTopicListRequest): unknown {
    const obj: any = {};
    if (message.filter !== undefined) {
      obj.filter = DeviceTopicFilter.toJSON(message.filter);
    }
    if (message.includeTotalCount !== false) {
      obj.includeTotalCount = message.includeTotalCount;
    }
    if (message.includeDevice !== false) {
      obj.includeDevice = message.includeDevice;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceTopicListRequest>, I>>(base?: I): DeviceTopicListRequest {
    return DeviceTopicListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceTopicListRequest>, I>>(object: I): DeviceTopicListRequest {
    const message = createBaseDeviceTopicListRequest();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? DeviceTopicFilter.fromPartial(object.filter)
      : undefined;
    message.includeTotalCount = object.includeTotalCount ?? false;
    message.includeDevice = object.includeDevice ?? false;
    message.cursor = object.cursor ?? "";
    message.limit = object.limit ?? 0;
    return message;
  },
};

function createBaseUserTopicFilter(): UserTopicFilter {
  return { users: [], topics: [], topicPrefix: "" };
}

export const UserTopicFilter = {
  encode(message: UserTopicFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.users) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.topics) {
      writer.uint32(18).string(v!);
    }
    if (message.topicPrefix !== "") {
      writer.uint32(26).string(message.topicPrefix);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserTopicFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserTopicFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.users.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.topics.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.topicPrefix = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserTopicFilter {
    return {
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => globalThis.String(e)) : [],
      topics: globalThis.Array.isArray(object?.topics) ? object.topics.map((e: any) => globalThis.String(e)) : [],
      topicPrefix: isSet(object.topicPrefix) ? globalThis.String(object.topicPrefix) : "",
    };
  },

  toJSON(message: UserTopicFilter): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users;
    }
    if (message.topics?.length) {
      obj.topics = message.topics;
    }
    if (message.topicPrefix !== "") {
      obj.topicPrefix = message.topicPrefix;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserTopicFilter>, I>>(base?: I): UserTopicFilter {
    return UserTopicFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserTopicFilter>, I>>(object: I): UserTopicFilter {
    const message = createBaseUserTopicFilter();
    message.users = object.users?.map((e) => e) || [];
    message.topics = object.topics?.map((e) => e) || [];
    message.topicPrefix = object.topicPrefix ?? "";
    return message;
  },
};

function createBaseUserTopicListRequest(): UserTopicListRequest {
  return { filter: undefined, includeTotalCount: false, cursor: "", limit: 0 };
}

export const UserTopicListRequest = {
  encode(message: UserTopicListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      UserTopicFilter.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    if (message.includeTotalCount !== false) {
      writer.uint32(16).bool(message.includeTotalCount);
    }
    if (message.cursor !== "") {
      writer.uint32(82).string(message.cursor);
    }
    if (message.limit !== 0) {
      writer.uint32(88).int32(message.limit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserTopicListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserTopicListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filter = UserTopicFilter.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.includeTotalCount = reader.bool();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.cursor = reader.string();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.limit = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserTopicListRequest {
    return {
      filter: isSet(object.filter) ? UserTopicFilter.fromJSON(object.filter) : undefined,
      includeTotalCount: isSet(object.includeTotalCount) ? globalThis.Boolean(object.includeTotalCount) : false,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
    };
  },

  toJSON(message: UserTopicListRequest): unknown {
    const obj: any = {};
    if (message.filter !== undefined) {
      obj.filter = UserTopicFilter.toJSON(message.filter);
    }
    if (message.includeTotalCount !== false) {
      obj.includeTotalCount = message.includeTotalCount;
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserTopicListRequest>, I>>(base?: I): UserTopicListRequest {
    return UserTopicListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserTopicListRequest>, I>>(object: I): UserTopicListRequest {
    const message = createBaseUserTopicListRequest();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? UserTopicFilter.fromPartial(object.filter)
      : undefined;
    message.includeTotalCount = object.includeTotalCount ?? false;
    message.cursor = object.cursor ?? "";
    message.limit = object.limit ?? 0;
    return message;
  },
};

function createBaseDeviceTopicUpdateRequest(): DeviceTopicUpdateRequest {
  return { deviceId: "", op: "", topics: [] };
}

export const DeviceTopicUpdateRequest = {
  encode(message: DeviceTopicUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.deviceId !== "") {
      writer.uint32(10).string(message.deviceId);
    }
    if (message.op !== "") {
      writer.uint32(18).string(message.op);
    }
    for (const v of message.topics) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceTopicUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceTopicUpdateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.deviceId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.op = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.topics.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceTopicUpdateRequest {
    return {
      deviceId: isSet(object.deviceId) ? globalThis.String(object.deviceId) : "",
      op: isSet(object.op) ? globalThis.String(object.op) : "",
      topics: globalThis.Array.isArray(object?.topics) ? object.topics.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: DeviceTopicUpdateRequest): unknown {
    const obj: any = {};
    if (message.deviceId !== "") {
      obj.deviceId = message.deviceId;
    }
    if (message.op !== "") {
      obj.op = message.op;
    }
    if (message.topics?.length) {
      obj.topics = message.topics;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceTopicUpdateRequest>, I>>(base?: I): DeviceTopicUpdateRequest {
    return DeviceTopicUpdateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceTopicUpdateRequest>, I>>(object: I): DeviceTopicUpdateRequest {
    const message = createBaseDeviceTopicUpdateRequest();
    message.deviceId = object.deviceId ?? "";
    message.op = object.op ?? "";
    message.topics = object.topics?.map((e) => e) || [];
    return message;
  },
};

function createBaseUserTopicUpdateRequest(): UserTopicUpdateRequest {
  return { user: "", op: "", topics: [] };
}

export const UserTopicUpdateRequest = {
  encode(message: UserTopicUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    if (message.op !== "") {
      writer.uint32(18).string(message.op);
    }
    for (const v of message.topics) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserTopicUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserTopicUpdateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.user = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.op = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.topics.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserTopicUpdateRequest {
    return {
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      op: isSet(object.op) ? globalThis.String(object.op) : "",
      topics: globalThis.Array.isArray(object?.topics) ? object.topics.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: UserTopicUpdateRequest): unknown {
    const obj: any = {};
    if (message.user !== "") {
      obj.user = message.user;
    }
    if (message.op !== "") {
      obj.op = message.op;
    }
    if (message.topics?.length) {
      obj.topics = message.topics;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserTopicUpdateRequest>, I>>(base?: I): UserTopicUpdateRequest {
    return UserTopicUpdateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserTopicUpdateRequest>, I>>(object: I): UserTopicUpdateRequest {
    const message = createBaseUserTopicUpdateRequest();
    message.user = object.user ?? "";
    message.op = object.op ?? "";
    message.topics = object.topics?.map((e) => e) || [];
    return message;
  },
};

function createBaseDeviceRegisterResponse(): DeviceRegisterResponse {
  return { error: undefined, result: undefined };
}

export const DeviceRegisterResponse = {
  encode(message: DeviceRegisterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      DeviceRegisterResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceRegisterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceRegisterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = DeviceRegisterResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceRegisterResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? DeviceRegisterResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: DeviceRegisterResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = DeviceRegisterResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceRegisterResponse>, I>>(base?: I): DeviceRegisterResponse {
    return DeviceRegisterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceRegisterResponse>, I>>(object: I): DeviceRegisterResponse {
    const message = createBaseDeviceRegisterResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? DeviceRegisterResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseDeviceUpdateResponse(): DeviceUpdateResponse {
  return { error: undefined, result: undefined };
}

export const DeviceUpdateResponse = {
  encode(message: DeviceUpdateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      DeviceUpdateResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceUpdateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = DeviceUpdateResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceUpdateResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? DeviceUpdateResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: DeviceUpdateResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = DeviceUpdateResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceUpdateResponse>, I>>(base?: I): DeviceUpdateResponse {
    return DeviceUpdateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceUpdateResponse>, I>>(object: I): DeviceUpdateResponse {
    const message = createBaseDeviceUpdateResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? DeviceUpdateResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseDeviceRemoveResponse(): DeviceRemoveResponse {
  return { error: undefined, result: undefined };
}

export const DeviceRemoveResponse = {
  encode(message: DeviceRemoveResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      DeviceRemoveResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceRemoveResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceRemoveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = DeviceRemoveResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceRemoveResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? DeviceRemoveResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: DeviceRemoveResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = DeviceRemoveResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceRemoveResponse>, I>>(base?: I): DeviceRemoveResponse {
    return DeviceRemoveResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceRemoveResponse>, I>>(object: I): DeviceRemoveResponse {
    const message = createBaseDeviceRemoveResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? DeviceRemoveResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseDeviceListResponse(): DeviceListResponse {
  return { error: undefined, result: undefined };
}

export const DeviceListResponse = {
  encode(message: DeviceListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      DeviceListResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = DeviceListResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceListResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? DeviceListResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: DeviceListResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = DeviceListResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceListResponse>, I>>(base?: I): DeviceListResponse {
    return DeviceListResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceListResponse>, I>>(object: I): DeviceListResponse {
    const message = createBaseDeviceListResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? DeviceListResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseDeviceTopicListResponse(): DeviceTopicListResponse {
  return { error: undefined, result: undefined };
}

export const DeviceTopicListResponse = {
  encode(message: DeviceTopicListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      DeviceTopicListResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceTopicListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceTopicListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = DeviceTopicListResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceTopicListResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? DeviceTopicListResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: DeviceTopicListResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = DeviceTopicListResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceTopicListResponse>, I>>(base?: I): DeviceTopicListResponse {
    return DeviceTopicListResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceTopicListResponse>, I>>(object: I): DeviceTopicListResponse {
    const message = createBaseDeviceTopicListResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? DeviceTopicListResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseUserTopicListResponse(): UserTopicListResponse {
  return { error: undefined, result: undefined };
}

export const UserTopicListResponse = {
  encode(message: UserTopicListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      UserTopicListResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserTopicListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserTopicListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = UserTopicListResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserTopicListResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? UserTopicListResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: UserTopicListResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = UserTopicListResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserTopicListResponse>, I>>(base?: I): UserTopicListResponse {
    return UserTopicListResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserTopicListResponse>, I>>(object: I): UserTopicListResponse {
    const message = createBaseUserTopicListResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? UserTopicListResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseDeviceTopicUpdateResponse(): DeviceTopicUpdateResponse {
  return { error: undefined, result: undefined };
}

export const DeviceTopicUpdateResponse = {
  encode(message: DeviceTopicUpdateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      DeviceTopicUpdateResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceTopicUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceTopicUpdateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = DeviceTopicUpdateResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceTopicUpdateResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? DeviceTopicUpdateResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: DeviceTopicUpdateResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = DeviceTopicUpdateResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceTopicUpdateResponse>, I>>(base?: I): DeviceTopicUpdateResponse {
    return DeviceTopicUpdateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceTopicUpdateResponse>, I>>(object: I): DeviceTopicUpdateResponse {
    const message = createBaseDeviceTopicUpdateResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? DeviceTopicUpdateResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseUserTopicUpdateResponse(): UserTopicUpdateResponse {
  return { error: undefined, result: undefined };
}

export const UserTopicUpdateResponse = {
  encode(message: UserTopicUpdateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      UserTopicUpdateResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserTopicUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserTopicUpdateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = UserTopicUpdateResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserTopicUpdateResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? UserTopicUpdateResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: UserTopicUpdateResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = UserTopicUpdateResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserTopicUpdateResponse>, I>>(base?: I): UserTopicUpdateResponse {
    return UserTopicUpdateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserTopicUpdateResponse>, I>>(object: I): UserTopicUpdateResponse {
    const message = createBaseUserTopicUpdateResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? UserTopicUpdateResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseDeviceRegisterResult(): DeviceRegisterResult {
  return { id: "" };
}

export const DeviceRegisterResult = {
  encode(message: DeviceRegisterResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceRegisterResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceRegisterResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceRegisterResult {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: DeviceRegisterResult): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceRegisterResult>, I>>(base?: I): DeviceRegisterResult {
    return DeviceRegisterResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceRegisterResult>, I>>(object: I): DeviceRegisterResult {
    const message = createBaseDeviceRegisterResult();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseDeviceUpdateResult(): DeviceUpdateResult {
  return {};
}

export const DeviceUpdateResult = {
  encode(_: DeviceUpdateResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceUpdateResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceUpdateResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): DeviceUpdateResult {
    return {};
  },

  toJSON(_: DeviceUpdateResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceUpdateResult>, I>>(base?: I): DeviceUpdateResult {
    return DeviceUpdateResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceUpdateResult>, I>>(_: I): DeviceUpdateResult {
    const message = createBaseDeviceUpdateResult();
    return message;
  },
};

function createBaseDeviceRemoveResult(): DeviceRemoveResult {
  return {};
}

export const DeviceRemoveResult = {
  encode(_: DeviceRemoveResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceRemoveResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceRemoveResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): DeviceRemoveResult {
    return {};
  },

  toJSON(_: DeviceRemoveResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceRemoveResult>, I>>(base?: I): DeviceRemoveResult {
    return DeviceRemoveResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceRemoveResult>, I>>(_: I): DeviceRemoveResult {
    const message = createBaseDeviceRemoveResult();
    return message;
  },
};

function createBaseDeviceListResult(): DeviceListResult {
  return { items: [], nextCursor: "", totalCount: 0 };
}

export const DeviceListResult = {
  encode(message: DeviceListResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      Device.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.nextCursor !== "") {
      writer.uint32(18).string(message.nextCursor);
    }
    if (message.totalCount !== 0) {
      writer.uint32(24).int64(message.totalCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceListResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceListResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.items.push(Device.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nextCursor = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.totalCount = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceListResult {
    return {
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => Device.fromJSON(e)) : [],
      nextCursor: isSet(object.nextCursor) ? globalThis.String(object.nextCursor) : "",
      totalCount: isSet(object.totalCount) ? globalThis.Number(object.totalCount) : 0,
    };
  },

  toJSON(message: DeviceListResult): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => Device.toJSON(e));
    }
    if (message.nextCursor !== "") {
      obj.nextCursor = message.nextCursor;
    }
    if (message.totalCount !== 0) {
      obj.totalCount = Math.round(message.totalCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceListResult>, I>>(base?: I): DeviceListResult {
    return DeviceListResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceListResult>, I>>(object: I): DeviceListResult {
    const message = createBaseDeviceListResult();
    message.items = object.items?.map((e) => Device.fromPartial(e)) || [];
    message.nextCursor = object.nextCursor ?? "";
    message.totalCount = object.totalCount ?? 0;
    return message;
  },
};

function createBaseDevice(): Device {
  return {
    id: "",
    platform: "",
    provider: "",
    token: "",
    user: "",
    createdAt: 0,
    updatedAt: 0,
    meta: {},
    topics: [],
    timezone: "",
    language: "",
  };
}

export const Device = {
  encode(message: Device, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.platform !== "") {
      writer.uint32(18).string(message.platform);
    }
    if (message.provider !== "") {
      writer.uint32(26).string(message.provider);
    }
    if (message.token !== "") {
      writer.uint32(34).string(message.token);
    }
    if (message.user !== "") {
      writer.uint32(42).string(message.user);
    }
    if (message.createdAt !== 0) {
      writer.uint32(48).int64(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      writer.uint32(56).int64(message.updatedAt);
    }
    Object.entries(message.meta).forEach(([key, value]) => {
      Device_MetaEntry.encode({ key: key as any, value }, writer.uint32(82).fork()).ldelim();
    });
    for (const v of message.topics) {
      writer.uint32(90).string(v!);
    }
    if (message.timezone !== "") {
      writer.uint32(98).string(message.timezone);
    }
    if (message.language !== "") {
      writer.uint32(106).string(message.language);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Device {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDevice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.platform = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.provider = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.token = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.user = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.createdAt = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.updatedAt = longToNumber(reader.int64() as Long);
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          const entry10 = Device_MetaEntry.decode(reader, reader.uint32());
          if (entry10.value !== undefined) {
            message.meta[entry10.key] = entry10.value;
          }
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.topics.push(reader.string());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.timezone = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.language = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Device {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      platform: isSet(object.platform) ? globalThis.String(object.platform) : "",
      provider: isSet(object.provider) ? globalThis.String(object.provider) : "",
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : 0,
      updatedAt: isSet(object.updatedAt) ? globalThis.Number(object.updatedAt) : 0,
      meta: isObject(object.meta)
        ? Object.entries(object.meta).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      topics: globalThis.Array.isArray(object?.topics) ? object.topics.map((e: any) => globalThis.String(e)) : [],
      timezone: isSet(object.timezone) ? globalThis.String(object.timezone) : "",
      language: isSet(object.language) ? globalThis.String(object.language) : "",
    };
  },

  toJSON(message: Device): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.platform !== "") {
      obj.platform = message.platform;
    }
    if (message.provider !== "") {
      obj.provider = message.provider;
    }
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.user !== "") {
      obj.user = message.user;
    }
    if (message.createdAt !== 0) {
      obj.createdAt = Math.round(message.createdAt);
    }
    if (message.updatedAt !== 0) {
      obj.updatedAt = Math.round(message.updatedAt);
    }
    if (message.meta) {
      const entries = Object.entries(message.meta);
      if (entries.length > 0) {
        obj.meta = {};
        entries.forEach(([k, v]) => {
          obj.meta[k] = v;
        });
      }
    }
    if (message.topics?.length) {
      obj.topics = message.topics;
    }
    if (message.timezone !== "") {
      obj.timezone = message.timezone;
    }
    if (message.language !== "") {
      obj.language = message.language;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Device>, I>>(base?: I): Device {
    return Device.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Device>, I>>(object: I): Device {
    const message = createBaseDevice();
    message.id = object.id ?? "";
    message.platform = object.platform ?? "";
    message.provider = object.provider ?? "";
    message.token = object.token ?? "";
    message.user = object.user ?? "";
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.meta = Object.entries(object.meta ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    message.topics = object.topics?.map((e) => e) || [];
    message.timezone = object.timezone ?? "";
    message.language = object.language ?? "";
    return message;
  },
};

function createBaseDevice_MetaEntry(): Device_MetaEntry {
  return { key: "", value: "" };
}

export const Device_MetaEntry = {
  encode(message: Device_MetaEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Device_MetaEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDevice_MetaEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Device_MetaEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: Device_MetaEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Device_MetaEntry>, I>>(base?: I): Device_MetaEntry {
    return Device_MetaEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Device_MetaEntry>, I>>(object: I): Device_MetaEntry {
    const message = createBaseDevice_MetaEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseDeviceTopicListResult(): DeviceTopicListResult {
  return { items: [], nextCursor: "", totalCount: 0 };
}

export const DeviceTopicListResult = {
  encode(message: DeviceTopicListResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      DeviceTopic.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.nextCursor !== "") {
      writer.uint32(18).string(message.nextCursor);
    }
    if (message.totalCount !== 0) {
      writer.uint32(24).int64(message.totalCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceTopicListResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceTopicListResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.items.push(DeviceTopic.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nextCursor = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.totalCount = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceTopicListResult {
    return {
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => DeviceTopic.fromJSON(e)) : [],
      nextCursor: isSet(object.nextCursor) ? globalThis.String(object.nextCursor) : "",
      totalCount: isSet(object.totalCount) ? globalThis.Number(object.totalCount) : 0,
    };
  },

  toJSON(message: DeviceTopicListResult): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => DeviceTopic.toJSON(e));
    }
    if (message.nextCursor !== "") {
      obj.nextCursor = message.nextCursor;
    }
    if (message.totalCount !== 0) {
      obj.totalCount = Math.round(message.totalCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceTopicListResult>, I>>(base?: I): DeviceTopicListResult {
    return DeviceTopicListResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceTopicListResult>, I>>(object: I): DeviceTopicListResult {
    const message = createBaseDeviceTopicListResult();
    message.items = object.items?.map((e) => DeviceTopic.fromPartial(e)) || [];
    message.nextCursor = object.nextCursor ?? "";
    message.totalCount = object.totalCount ?? 0;
    return message;
  },
};

function createBaseDeviceTopic(): DeviceTopic {
  return { id: "", topic: "", device: undefined };
}

export const DeviceTopic = {
  encode(message: DeviceTopic, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.topic !== "") {
      writer.uint32(18).string(message.topic);
    }
    if (message.device !== undefined) {
      Device.encode(message.device, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceTopic {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceTopic();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.topic = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.device = Device.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeviceTopic {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      topic: isSet(object.topic) ? globalThis.String(object.topic) : "",
      device: isSet(object.device) ? Device.fromJSON(object.device) : undefined,
    };
  },

  toJSON(message: DeviceTopic): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.topic !== "") {
      obj.topic = message.topic;
    }
    if (message.device !== undefined) {
      obj.device = Device.toJSON(message.device);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceTopic>, I>>(base?: I): DeviceTopic {
    return DeviceTopic.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceTopic>, I>>(object: I): DeviceTopic {
    const message = createBaseDeviceTopic();
    message.id = object.id ?? "";
    message.topic = object.topic ?? "";
    message.device = (object.device !== undefined && object.device !== null)
      ? Device.fromPartial(object.device)
      : undefined;
    return message;
  },
};

function createBaseUserTopicListResult(): UserTopicListResult {
  return { items: [], nextCursor: "", totalCount: 0 };
}

export const UserTopicListResult = {
  encode(message: UserTopicListResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      UserTopic.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.nextCursor !== "") {
      writer.uint32(18).string(message.nextCursor);
    }
    if (message.totalCount !== 0) {
      writer.uint32(24).int64(message.totalCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserTopicListResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserTopicListResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.items.push(UserTopic.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nextCursor = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.totalCount = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserTopicListResult {
    return {
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => UserTopic.fromJSON(e)) : [],
      nextCursor: isSet(object.nextCursor) ? globalThis.String(object.nextCursor) : "",
      totalCount: isSet(object.totalCount) ? globalThis.Number(object.totalCount) : 0,
    };
  },

  toJSON(message: UserTopicListResult): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => UserTopic.toJSON(e));
    }
    if (message.nextCursor !== "") {
      obj.nextCursor = message.nextCursor;
    }
    if (message.totalCount !== 0) {
      obj.totalCount = Math.round(message.totalCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserTopicListResult>, I>>(base?: I): UserTopicListResult {
    return UserTopicListResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserTopicListResult>, I>>(object: I): UserTopicListResult {
    const message = createBaseUserTopicListResult();
    message.items = object.items?.map((e) => UserTopic.fromPartial(e)) || [];
    message.nextCursor = object.nextCursor ?? "";
    message.totalCount = object.totalCount ?? 0;
    return message;
  },
};

function createBaseDeviceTopicUpdateResult(): DeviceTopicUpdateResult {
  return {};
}

export const DeviceTopicUpdateResult = {
  encode(_: DeviceTopicUpdateResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeviceTopicUpdateResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceTopicUpdateResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): DeviceTopicUpdateResult {
    return {};
  },

  toJSON(_: DeviceTopicUpdateResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<DeviceTopicUpdateResult>, I>>(base?: I): DeviceTopicUpdateResult {
    return DeviceTopicUpdateResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeviceTopicUpdateResult>, I>>(_: I): DeviceTopicUpdateResult {
    const message = createBaseDeviceTopicUpdateResult();
    return message;
  },
};

function createBaseUserTopicUpdateResult(): UserTopicUpdateResult {
  return {};
}

export const UserTopicUpdateResult = {
  encode(_: UserTopicUpdateResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserTopicUpdateResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserTopicUpdateResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): UserTopicUpdateResult {
    return {};
  },

  toJSON(_: UserTopicUpdateResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<UserTopicUpdateResult>, I>>(base?: I): UserTopicUpdateResult {
    return UserTopicUpdateResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserTopicUpdateResult>, I>>(_: I): UserTopicUpdateResult {
    const message = createBaseUserTopicUpdateResult();
    return message;
  },
};

function createBaseUserTopic(): UserTopic {
  return { id: "", user: "", topic: "" };
}

export const UserTopic = {
  encode(message: UserTopic, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.user !== "") {
      writer.uint32(18).string(message.user);
    }
    if (message.topic !== "") {
      writer.uint32(26).string(message.topic);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserTopic {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserTopic();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.user = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.topic = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserTopic {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      user: isSet(object.user) ? globalThis.String(object.user) : "",
      topic: isSet(object.topic) ? globalThis.String(object.topic) : "",
    };
  },

  toJSON(message: UserTopic): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.user !== "") {
      obj.user = message.user;
    }
    if (message.topic !== "") {
      obj.topic = message.topic;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserTopic>, I>>(base?: I): UserTopic {
    return UserTopic.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserTopic>, I>>(object: I): UserTopic {
    const message = createBaseUserTopic();
    message.id = object.id ?? "";
    message.user = object.user ?? "";
    message.topic = object.topic ?? "";
    return message;
  },
};

function createBasePushRecipient(): PushRecipient {
  return {
    filter: undefined,
    fcmTokens: [],
    fcmTopic: "",
    fcmCondition: "",
    hmsTokens: [],
    hmsTopic: "",
    hmsCondition: "",
    apnsTokens: [],
  };
}

export const PushRecipient = {
  encode(message: PushRecipient, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      DeviceFilter.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.fcmTokens) {
      writer.uint32(18).string(v!);
    }
    if (message.fcmTopic !== "") {
      writer.uint32(26).string(message.fcmTopic);
    }
    if (message.fcmCondition !== "") {
      writer.uint32(34).string(message.fcmCondition);
    }
    for (const v of message.hmsTokens) {
      writer.uint32(42).string(v!);
    }
    if (message.hmsTopic !== "") {
      writer.uint32(50).string(message.hmsTopic);
    }
    if (message.hmsCondition !== "") {
      writer.uint32(58).string(message.hmsCondition);
    }
    for (const v of message.apnsTokens) {
      writer.uint32(66).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PushRecipient {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePushRecipient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filter = DeviceFilter.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fcmTokens.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.fcmTopic = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.fcmCondition = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.hmsTokens.push(reader.string());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.hmsTopic = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.hmsCondition = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.apnsTokens.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PushRecipient {
    return {
      filter: isSet(object.filter) ? DeviceFilter.fromJSON(object.filter) : undefined,
      fcmTokens: globalThis.Array.isArray(object?.fcmTokens)
        ? object.fcmTokens.map((e: any) => globalThis.String(e))
        : [],
      fcmTopic: isSet(object.fcmTopic) ? globalThis.String(object.fcmTopic) : "",
      fcmCondition: isSet(object.fcmCondition) ? globalThis.String(object.fcmCondition) : "",
      hmsTokens: globalThis.Array.isArray(object?.hmsTokens)
        ? object.hmsTokens.map((e: any) => globalThis.String(e))
        : [],
      hmsTopic: isSet(object.hmsTopic) ? globalThis.String(object.hmsTopic) : "",
      hmsCondition: isSet(object.hmsCondition) ? globalThis.String(object.hmsCondition) : "",
      apnsTokens: globalThis.Array.isArray(object?.apnsTokens)
        ? object.apnsTokens.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: PushRecipient): unknown {
    const obj: any = {};
    if (message.filter !== undefined) {
      obj.filter = DeviceFilter.toJSON(message.filter);
    }
    if (message.fcmTokens?.length) {
      obj.fcmTokens = message.fcmTokens;
    }
    if (message.fcmTopic !== "") {
      obj.fcmTopic = message.fcmTopic;
    }
    if (message.fcmCondition !== "") {
      obj.fcmCondition = message.fcmCondition;
    }
    if (message.hmsTokens?.length) {
      obj.hmsTokens = message.hmsTokens;
    }
    if (message.hmsTopic !== "") {
      obj.hmsTopic = message.hmsTopic;
    }
    if (message.hmsCondition !== "") {
      obj.hmsCondition = message.hmsCondition;
    }
    if (message.apnsTokens?.length) {
      obj.apnsTokens = message.apnsTokens;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PushRecipient>, I>>(base?: I): PushRecipient {
    return PushRecipient.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PushRecipient>, I>>(object: I): PushRecipient {
    const message = createBasePushRecipient();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? DeviceFilter.fromPartial(object.filter)
      : undefined;
    message.fcmTokens = object.fcmTokens?.map((e) => e) || [];
    message.fcmTopic = object.fcmTopic ?? "";
    message.fcmCondition = object.fcmCondition ?? "";
    message.hmsTokens = object.hmsTokens?.map((e) => e) || [];
    message.hmsTopic = object.hmsTopic ?? "";
    message.hmsCondition = object.hmsCondition ?? "";
    message.apnsTokens = object.apnsTokens?.map((e) => e) || [];
    return message;
  },
};

function createBasePushNotification(): PushNotification {
  return { fcm: undefined, hms: undefined, apns: undefined, expireAt: 0 };
}

export const PushNotification = {
  encode(message: PushNotification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fcm !== undefined) {
      FcmPushNotification.encode(message.fcm, writer.uint32(10).fork()).ldelim();
    }
    if (message.hms !== undefined) {
      HmsPushNotification.encode(message.hms, writer.uint32(18).fork()).ldelim();
    }
    if (message.apns !== undefined) {
      ApnsPushNotification.encode(message.apns, writer.uint32(26).fork()).ldelim();
    }
    if (message.expireAt !== 0) {
      writer.uint32(40).int64(message.expireAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PushNotification {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePushNotification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fcm = FcmPushNotification.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.hms = HmsPushNotification.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.apns = ApnsPushNotification.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.expireAt = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PushNotification {
    return {
      fcm: isSet(object.fcm) ? FcmPushNotification.fromJSON(object.fcm) : undefined,
      hms: isSet(object.hms) ? HmsPushNotification.fromJSON(object.hms) : undefined,
      apns: isSet(object.apns) ? ApnsPushNotification.fromJSON(object.apns) : undefined,
      expireAt: isSet(object.expireAt) ? globalThis.Number(object.expireAt) : 0,
    };
  },

  toJSON(message: PushNotification): unknown {
    const obj: any = {};
    if (message.fcm !== undefined) {
      obj.fcm = FcmPushNotification.toJSON(message.fcm);
    }
    if (message.hms !== undefined) {
      obj.hms = HmsPushNotification.toJSON(message.hms);
    }
    if (message.apns !== undefined) {
      obj.apns = ApnsPushNotification.toJSON(message.apns);
    }
    if (message.expireAt !== 0) {
      obj.expireAt = Math.round(message.expireAt);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PushNotification>, I>>(base?: I): PushNotification {
    return PushNotification.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PushNotification>, I>>(object: I): PushNotification {
    const message = createBasePushNotification();
    message.fcm = (object.fcm !== undefined && object.fcm !== null)
      ? FcmPushNotification.fromPartial(object.fcm)
      : undefined;
    message.hms = (object.hms !== undefined && object.hms !== null)
      ? HmsPushNotification.fromPartial(object.hms)
      : undefined;
    message.apns = (object.apns !== undefined && object.apns !== null)
      ? ApnsPushNotification.fromPartial(object.apns)
      : undefined;
    message.expireAt = object.expireAt ?? 0;
    return message;
  },
};

function createBaseFcmPushNotification(): FcmPushNotification {
  return { message: new Uint8Array(0) };
}

export const FcmPushNotification = {
  encode(message: FcmPushNotification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message.length !== 0) {
      writer.uint32(10).bytes(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FcmPushNotification {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFcmPushNotification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FcmPushNotification {
    return { message: isSet(object.message) ? bytesFromBase64(object.message) : new Uint8Array(0) };
  },

  toJSON(message: FcmPushNotification): unknown {
    const obj: any = {};
    if (message.message.length !== 0) {
      obj.message = base64FromBytes(message.message);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FcmPushNotification>, I>>(base?: I): FcmPushNotification {
    return FcmPushNotification.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FcmPushNotification>, I>>(object: I): FcmPushNotification {
    const message = createBaseFcmPushNotification();
    message.message = object.message ?? new Uint8Array(0);
    return message;
  },
};

function createBaseHmsPushNotification(): HmsPushNotification {
  return { message: new Uint8Array(0) };
}

export const HmsPushNotification = {
  encode(message: HmsPushNotification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message.length !== 0) {
      writer.uint32(10).bytes(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HmsPushNotification {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHmsPushNotification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HmsPushNotification {
    return { message: isSet(object.message) ? bytesFromBase64(object.message) : new Uint8Array(0) };
  },

  toJSON(message: HmsPushNotification): unknown {
    const obj: any = {};
    if (message.message.length !== 0) {
      obj.message = base64FromBytes(message.message);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HmsPushNotification>, I>>(base?: I): HmsPushNotification {
    return HmsPushNotification.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HmsPushNotification>, I>>(object: I): HmsPushNotification {
    const message = createBaseHmsPushNotification();
    message.message = object.message ?? new Uint8Array(0);
    return message;
  },
};

function createBaseApnsPushNotification(): ApnsPushNotification {
  return { headers: {}, payload: new Uint8Array(0) };
}

export const ApnsPushNotification = {
  encode(message: ApnsPushNotification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.headers).forEach(([key, value]) => {
      ApnsPushNotification_HeadersEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    if (message.payload.length !== 0) {
      writer.uint32(18).bytes(message.payload);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApnsPushNotification {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApnsPushNotification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = ApnsPushNotification_HeadersEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.headers[entry1.key] = entry1.value;
          }
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.payload = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ApnsPushNotification {
    return {
      headers: isObject(object.headers)
        ? Object.entries(object.headers).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(0),
    };
  },

  toJSON(message: ApnsPushNotification): unknown {
    const obj: any = {};
    if (message.headers) {
      const entries = Object.entries(message.headers);
      if (entries.length > 0) {
        obj.headers = {};
        entries.forEach(([k, v]) => {
          obj.headers[k] = v;
        });
      }
    }
    if (message.payload.length !== 0) {
      obj.payload = base64FromBytes(message.payload);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ApnsPushNotification>, I>>(base?: I): ApnsPushNotification {
    return ApnsPushNotification.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ApnsPushNotification>, I>>(object: I): ApnsPushNotification {
    const message = createBaseApnsPushNotification();
    message.headers = Object.entries(object.headers ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    message.payload = object.payload ?? new Uint8Array(0);
    return message;
  },
};

function createBaseApnsPushNotification_HeadersEntry(): ApnsPushNotification_HeadersEntry {
  return { key: "", value: "" };
}

export const ApnsPushNotification_HeadersEntry = {
  encode(message: ApnsPushNotification_HeadersEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApnsPushNotification_HeadersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApnsPushNotification_HeadersEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ApnsPushNotification_HeadersEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: ApnsPushNotification_HeadersEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ApnsPushNotification_HeadersEntry>, I>>(
    base?: I,
  ): ApnsPushNotification_HeadersEntry {
    return ApnsPushNotification_HeadersEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ApnsPushNotification_HeadersEntry>, I>>(
    object: I,
  ): ApnsPushNotification_HeadersEntry {
    const message = createBaseApnsPushNotification_HeadersEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseSendPushNotificationRequest(): SendPushNotificationRequest {
  return {
    recipient: undefined,
    notification: undefined,
    uid: "",
    sendAt: 0,
    optimizeForReliability: false,
    limitStrategy: undefined,
    analyticsUid: "",
    localizations: {},
    useTemplating: false,
    useMeta: false,
  };
}

export const SendPushNotificationRequest = {
  encode(message: SendPushNotificationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipient !== undefined) {
      PushRecipient.encode(message.recipient, writer.uint32(10).fork()).ldelim();
    }
    if (message.notification !== undefined) {
      PushNotification.encode(message.notification, writer.uint32(18).fork()).ldelim();
    }
    if (message.uid !== "") {
      writer.uint32(26).string(message.uid);
    }
    if (message.sendAt !== 0) {
      writer.uint32(32).int64(message.sendAt);
    }
    if (message.optimizeForReliability !== false) {
      writer.uint32(40).bool(message.optimizeForReliability);
    }
    if (message.limitStrategy !== undefined) {
      PushLimitStrategy.encode(message.limitStrategy, writer.uint32(50).fork()).ldelim();
    }
    if (message.analyticsUid !== "") {
      writer.uint32(58).string(message.analyticsUid);
    }
    Object.entries(message.localizations).forEach(([key, value]) => {
      SendPushNotificationRequest_LocalizationsEntry.encode({ key: key as any, value }, writer.uint32(66).fork())
        .ldelim();
    });
    if (message.useTemplating !== false) {
      writer.uint32(72).bool(message.useTemplating);
    }
    if (message.useMeta !== false) {
      writer.uint32(80).bool(message.useMeta);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendPushNotificationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendPushNotificationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.recipient = PushRecipient.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.notification = PushNotification.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.uid = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.sendAt = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.optimizeForReliability = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.limitStrategy = PushLimitStrategy.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.analyticsUid = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          const entry8 = SendPushNotificationRequest_LocalizationsEntry.decode(reader, reader.uint32());
          if (entry8.value !== undefined) {
            message.localizations[entry8.key] = entry8.value;
          }
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.useTemplating = reader.bool();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.useMeta = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendPushNotificationRequest {
    return {
      recipient: isSet(object.recipient) ? PushRecipient.fromJSON(object.recipient) : undefined,
      notification: isSet(object.notification) ? PushNotification.fromJSON(object.notification) : undefined,
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
      sendAt: isSet(object.sendAt) ? globalThis.Number(object.sendAt) : 0,
      optimizeForReliability: isSet(object.optimizeForReliability)
        ? globalThis.Boolean(object.optimizeForReliability)
        : false,
      limitStrategy: isSet(object.limitStrategy) ? PushLimitStrategy.fromJSON(object.limitStrategy) : undefined,
      analyticsUid: isSet(object.analyticsUid) ? globalThis.String(object.analyticsUid) : "",
      localizations: isObject(object.localizations)
        ? Object.entries(object.localizations).reduce<{ [key: string]: PushLocalization }>((acc, [key, value]) => {
          acc[key] = PushLocalization.fromJSON(value);
          return acc;
        }, {})
        : {},
      useTemplating: isSet(object.useTemplating) ? globalThis.Boolean(object.useTemplating) : false,
      useMeta: isSet(object.useMeta) ? globalThis.Boolean(object.useMeta) : false,
    };
  },

  toJSON(message: SendPushNotificationRequest): unknown {
    const obj: any = {};
    if (message.recipient !== undefined) {
      obj.recipient = PushRecipient.toJSON(message.recipient);
    }
    if (message.notification !== undefined) {
      obj.notification = PushNotification.toJSON(message.notification);
    }
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    if (message.sendAt !== 0) {
      obj.sendAt = Math.round(message.sendAt);
    }
    if (message.optimizeForReliability !== false) {
      obj.optimizeForReliability = message.optimizeForReliability;
    }
    if (message.limitStrategy !== undefined) {
      obj.limitStrategy = PushLimitStrategy.toJSON(message.limitStrategy);
    }
    if (message.analyticsUid !== "") {
      obj.analyticsUid = message.analyticsUid;
    }
    if (message.localizations) {
      const entries = Object.entries(message.localizations);
      if (entries.length > 0) {
        obj.localizations = {};
        entries.forEach(([k, v]) => {
          obj.localizations[k] = PushLocalization.toJSON(v);
        });
      }
    }
    if (message.useTemplating !== false) {
      obj.useTemplating = message.useTemplating;
    }
    if (message.useMeta !== false) {
      obj.useMeta = message.useMeta;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendPushNotificationRequest>, I>>(base?: I): SendPushNotificationRequest {
    return SendPushNotificationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendPushNotificationRequest>, I>>(object: I): SendPushNotificationRequest {
    const message = createBaseSendPushNotificationRequest();
    message.recipient = (object.recipient !== undefined && object.recipient !== null)
      ? PushRecipient.fromPartial(object.recipient)
      : undefined;
    message.notification = (object.notification !== undefined && object.notification !== null)
      ? PushNotification.fromPartial(object.notification)
      : undefined;
    message.uid = object.uid ?? "";
    message.sendAt = object.sendAt ?? 0;
    message.optimizeForReliability = object.optimizeForReliability ?? false;
    message.limitStrategy = (object.limitStrategy !== undefined && object.limitStrategy !== null)
      ? PushLimitStrategy.fromPartial(object.limitStrategy)
      : undefined;
    message.analyticsUid = object.analyticsUid ?? "";
    message.localizations = Object.entries(object.localizations ?? {}).reduce<{ [key: string]: PushLocalization }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = PushLocalization.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.useTemplating = object.useTemplating ?? false;
    message.useMeta = object.useMeta ?? false;
    return message;
  },
};

function createBaseSendPushNotificationRequest_LocalizationsEntry(): SendPushNotificationRequest_LocalizationsEntry {
  return { key: "", value: undefined };
}

export const SendPushNotificationRequest_LocalizationsEntry = {
  encode(
    message: SendPushNotificationRequest_LocalizationsEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      PushLocalization.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendPushNotificationRequest_LocalizationsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendPushNotificationRequest_LocalizationsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = PushLocalization.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendPushNotificationRequest_LocalizationsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? PushLocalization.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: SendPushNotificationRequest_LocalizationsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = PushLocalization.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendPushNotificationRequest_LocalizationsEntry>, I>>(
    base?: I,
  ): SendPushNotificationRequest_LocalizationsEntry {
    return SendPushNotificationRequest_LocalizationsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendPushNotificationRequest_LocalizationsEntry>, I>>(
    object: I,
  ): SendPushNotificationRequest_LocalizationsEntry {
    const message = createBaseSendPushNotificationRequest_LocalizationsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? PushLocalization.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBasePushLocalization(): PushLocalization {
  return { translations: {} };
}

export const PushLocalization = {
  encode(message: PushLocalization, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.translations).forEach(([key, value]) => {
      PushLocalization_TranslationsEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PushLocalization {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePushLocalization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = PushLocalization_TranslationsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.translations[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PushLocalization {
    return {
      translations: isObject(object.translations)
        ? Object.entries(object.translations).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: PushLocalization): unknown {
    const obj: any = {};
    if (message.translations) {
      const entries = Object.entries(message.translations);
      if (entries.length > 0) {
        obj.translations = {};
        entries.forEach(([k, v]) => {
          obj.translations[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PushLocalization>, I>>(base?: I): PushLocalization {
    return PushLocalization.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PushLocalization>, I>>(object: I): PushLocalization {
    const message = createBasePushLocalization();
    message.translations = Object.entries(object.translations ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = globalThis.String(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBasePushLocalization_TranslationsEntry(): PushLocalization_TranslationsEntry {
  return { key: "", value: "" };
}

export const PushLocalization_TranslationsEntry = {
  encode(message: PushLocalization_TranslationsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PushLocalization_TranslationsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePushLocalization_TranslationsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PushLocalization_TranslationsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: PushLocalization_TranslationsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PushLocalization_TranslationsEntry>, I>>(
    base?: I,
  ): PushLocalization_TranslationsEntry {
    return PushLocalization_TranslationsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PushLocalization_TranslationsEntry>, I>>(
    object: I,
  ): PushLocalization_TranslationsEntry {
    const message = createBasePushLocalization_TranslationsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBasePushLimitStrategy(): PushLimitStrategy {
  return { rateLimit: undefined, timeLimit: undefined };
}

export const PushLimitStrategy = {
  encode(message: PushLimitStrategy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rateLimit !== undefined) {
      PushRateLimitStrategy.encode(message.rateLimit, writer.uint32(10).fork()).ldelim();
    }
    if (message.timeLimit !== undefined) {
      PushTimeLimitStrategy.encode(message.timeLimit, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PushLimitStrategy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePushLimitStrategy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rateLimit = PushRateLimitStrategy.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.timeLimit = PushTimeLimitStrategy.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PushLimitStrategy {
    return {
      rateLimit: isSet(object.rateLimit) ? PushRateLimitStrategy.fromJSON(object.rateLimit) : undefined,
      timeLimit: isSet(object.timeLimit) ? PushTimeLimitStrategy.fromJSON(object.timeLimit) : undefined,
    };
  },

  toJSON(message: PushLimitStrategy): unknown {
    const obj: any = {};
    if (message.rateLimit !== undefined) {
      obj.rateLimit = PushRateLimitStrategy.toJSON(message.rateLimit);
    }
    if (message.timeLimit !== undefined) {
      obj.timeLimit = PushTimeLimitStrategy.toJSON(message.timeLimit);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PushLimitStrategy>, I>>(base?: I): PushLimitStrategy {
    return PushLimitStrategy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PushLimitStrategy>, I>>(object: I): PushLimitStrategy {
    const message = createBasePushLimitStrategy();
    message.rateLimit = (object.rateLimit !== undefined && object.rateLimit !== null)
      ? PushRateLimitStrategy.fromPartial(object.rateLimit)
      : undefined;
    message.timeLimit = (object.timeLimit !== undefined && object.timeLimit !== null)
      ? PushTimeLimitStrategy.fromPartial(object.timeLimit)
      : undefined;
    return message;
  },
};

function createBasePushTimeLimitStrategy(): PushTimeLimitStrategy {
  return { sendAfterTime: "", sendBeforeTime: "", noTzSendNow: false };
}

export const PushTimeLimitStrategy = {
  encode(message: PushTimeLimitStrategy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sendAfterTime !== "") {
      writer.uint32(10).string(message.sendAfterTime);
    }
    if (message.sendBeforeTime !== "") {
      writer.uint32(18).string(message.sendBeforeTime);
    }
    if (message.noTzSendNow !== false) {
      writer.uint32(24).bool(message.noTzSendNow);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PushTimeLimitStrategy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePushTimeLimitStrategy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sendAfterTime = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sendBeforeTime = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.noTzSendNow = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PushTimeLimitStrategy {
    return {
      sendAfterTime: isSet(object.sendAfterTime) ? globalThis.String(object.sendAfterTime) : "",
      sendBeforeTime: isSet(object.sendBeforeTime) ? globalThis.String(object.sendBeforeTime) : "",
      noTzSendNow: isSet(object.noTzSendNow) ? globalThis.Boolean(object.noTzSendNow) : false,
    };
  },

  toJSON(message: PushTimeLimitStrategy): unknown {
    const obj: any = {};
    if (message.sendAfterTime !== "") {
      obj.sendAfterTime = message.sendAfterTime;
    }
    if (message.sendBeforeTime !== "") {
      obj.sendBeforeTime = message.sendBeforeTime;
    }
    if (message.noTzSendNow !== false) {
      obj.noTzSendNow = message.noTzSendNow;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PushTimeLimitStrategy>, I>>(base?: I): PushTimeLimitStrategy {
    return PushTimeLimitStrategy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PushTimeLimitStrategy>, I>>(object: I): PushTimeLimitStrategy {
    const message = createBasePushTimeLimitStrategy();
    message.sendAfterTime = object.sendAfterTime ?? "";
    message.sendBeforeTime = object.sendBeforeTime ?? "";
    message.noTzSendNow = object.noTzSendNow ?? false;
    return message;
  },
};

function createBasePushRateLimitStrategy(): PushRateLimitStrategy {
  return { key: "", policies: [], dropIfRateLimited: false };
}

export const PushRateLimitStrategy = {
  encode(message: PushRateLimitStrategy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    for (const v of message.policies) {
      RateLimitPolicy.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.dropIfRateLimited !== false) {
      writer.uint32(24).bool(message.dropIfRateLimited);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PushRateLimitStrategy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePushRateLimitStrategy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.policies.push(RateLimitPolicy.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.dropIfRateLimited = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PushRateLimitStrategy {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      policies: globalThis.Array.isArray(object?.policies)
        ? object.policies.map((e: any) => RateLimitPolicy.fromJSON(e))
        : [],
      dropIfRateLimited: isSet(object.dropIfRateLimited) ? globalThis.Boolean(object.dropIfRateLimited) : false,
    };
  },

  toJSON(message: PushRateLimitStrategy): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.policies?.length) {
      obj.policies = message.policies.map((e) => RateLimitPolicy.toJSON(e));
    }
    if (message.dropIfRateLimited !== false) {
      obj.dropIfRateLimited = message.dropIfRateLimited;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PushRateLimitStrategy>, I>>(base?: I): PushRateLimitStrategy {
    return PushRateLimitStrategy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PushRateLimitStrategy>, I>>(object: I): PushRateLimitStrategy {
    const message = createBasePushRateLimitStrategy();
    message.key = object.key ?? "";
    message.policies = object.policies?.map((e) => RateLimitPolicy.fromPartial(e)) || [];
    message.dropIfRateLimited = object.dropIfRateLimited ?? false;
    return message;
  },
};

function createBaseSendPushNotificationResponse(): SendPushNotificationResponse {
  return { error: undefined, result: undefined };
}

export const SendPushNotificationResponse = {
  encode(message: SendPushNotificationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      SendPushNotificationResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendPushNotificationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendPushNotificationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = SendPushNotificationResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendPushNotificationResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? SendPushNotificationResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: SendPushNotificationResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = SendPushNotificationResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendPushNotificationResponse>, I>>(base?: I): SendPushNotificationResponse {
    return SendPushNotificationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendPushNotificationResponse>, I>>(object: I): SendPushNotificationResponse {
    const message = createBaseSendPushNotificationResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? SendPushNotificationResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseSendPushNotificationResult(): SendPushNotificationResult {
  return { uid: "" };
}

export const SendPushNotificationResult = {
  encode(message: SendPushNotificationResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uid !== "") {
      writer.uint32(10).string(message.uid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendPushNotificationResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendPushNotificationResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendPushNotificationResult {
    return { uid: isSet(object.uid) ? globalThis.String(object.uid) : "" };
  },

  toJSON(message: SendPushNotificationResult): unknown {
    const obj: any = {};
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendPushNotificationResult>, I>>(base?: I): SendPushNotificationResult {
    return SendPushNotificationResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendPushNotificationResult>, I>>(object: I): SendPushNotificationResult {
    const message = createBaseSendPushNotificationResult();
    message.uid = object.uid ?? "";
    return message;
  },
};

function createBaseUpdatePushStatusRequest(): UpdatePushStatusRequest {
  return { analyticsUid: "", status: "", deviceId: "", msgId: "" };
}

export const UpdatePushStatusRequest = {
  encode(message: UpdatePushStatusRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.analyticsUid !== "") {
      writer.uint32(10).string(message.analyticsUid);
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    if (message.deviceId !== "") {
      writer.uint32(26).string(message.deviceId);
    }
    if (message.msgId !== "") {
      writer.uint32(34).string(message.msgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdatePushStatusRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePushStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.analyticsUid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.status = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.deviceId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.msgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdatePushStatusRequest {
    return {
      analyticsUid: isSet(object.analyticsUid) ? globalThis.String(object.analyticsUid) : "",
      status: isSet(object.status) ? globalThis.String(object.status) : "",
      deviceId: isSet(object.deviceId) ? globalThis.String(object.deviceId) : "",
      msgId: isSet(object.msgId) ? globalThis.String(object.msgId) : "",
    };
  },

  toJSON(message: UpdatePushStatusRequest): unknown {
    const obj: any = {};
    if (message.analyticsUid !== "") {
      obj.analyticsUid = message.analyticsUid;
    }
    if (message.status !== "") {
      obj.status = message.status;
    }
    if (message.deviceId !== "") {
      obj.deviceId = message.deviceId;
    }
    if (message.msgId !== "") {
      obj.msgId = message.msgId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdatePushStatusRequest>, I>>(base?: I): UpdatePushStatusRequest {
    return UpdatePushStatusRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdatePushStatusRequest>, I>>(object: I): UpdatePushStatusRequest {
    const message = createBaseUpdatePushStatusRequest();
    message.analyticsUid = object.analyticsUid ?? "";
    message.status = object.status ?? "";
    message.deviceId = object.deviceId ?? "";
    message.msgId = object.msgId ?? "";
    return message;
  },
};

function createBaseUpdatePushStatusResponse(): UpdatePushStatusResponse {
  return { error: undefined, result: undefined };
}

export const UpdatePushStatusResponse = {
  encode(message: UpdatePushStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      UpdatePushStatusResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdatePushStatusResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePushStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = UpdatePushStatusResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdatePushStatusResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? UpdatePushStatusResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: UpdatePushStatusResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = UpdatePushStatusResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdatePushStatusResponse>, I>>(base?: I): UpdatePushStatusResponse {
    return UpdatePushStatusResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdatePushStatusResponse>, I>>(object: I): UpdatePushStatusResponse {
    const message = createBaseUpdatePushStatusResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? UpdatePushStatusResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseUpdatePushStatusResult(): UpdatePushStatusResult {
  return {};
}

export const UpdatePushStatusResult = {
  encode(_: UpdatePushStatusResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdatePushStatusResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePushStatusResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): UpdatePushStatusResult {
    return {};
  },

  toJSON(_: UpdatePushStatusResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdatePushStatusResult>, I>>(base?: I): UpdatePushStatusResult {
    return UpdatePushStatusResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdatePushStatusResult>, I>>(_: I): UpdatePushStatusResult {
    const message = createBaseUpdatePushStatusResult();
    return message;
  },
};

function createBaseCancelPushRequest(): CancelPushRequest {
  return { uid: "" };
}

export const CancelPushRequest = {
  encode(message: CancelPushRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uid !== "") {
      writer.uint32(10).string(message.uid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CancelPushRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelPushRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CancelPushRequest {
    return { uid: isSet(object.uid) ? globalThis.String(object.uid) : "" };
  },

  toJSON(message: CancelPushRequest): unknown {
    const obj: any = {};
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CancelPushRequest>, I>>(base?: I): CancelPushRequest {
    return CancelPushRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CancelPushRequest>, I>>(object: I): CancelPushRequest {
    const message = createBaseCancelPushRequest();
    message.uid = object.uid ?? "";
    return message;
  },
};

function createBaseCancelPushResponse(): CancelPushResponse {
  return { error: undefined, result: undefined };
}

export const CancelPushResponse = {
  encode(message: CancelPushResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      CancelPushResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CancelPushResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelPushResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = CancelPushResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CancelPushResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? CancelPushResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: CancelPushResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = CancelPushResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CancelPushResponse>, I>>(base?: I): CancelPushResponse {
    return CancelPushResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CancelPushResponse>, I>>(object: I): CancelPushResponse {
    const message = createBaseCancelPushResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? CancelPushResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseCancelPushResult(): CancelPushResult {
  return {};
}

export const CancelPushResult = {
  encode(_: CancelPushResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CancelPushResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelPushResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): CancelPushResult {
    return {};
  },

  toJSON(_: CancelPushResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<CancelPushResult>, I>>(base?: I): CancelPushResult {
    return CancelPushResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CancelPushResult>, I>>(_: I): CancelPushResult {
    const message = createBaseCancelPushResult();
    return message;
  },
};

function createBaseRateLimitPolicy(): RateLimitPolicy {
  return { rate: 0, intervalMs: 0 };
}

export const RateLimitPolicy = {
  encode(message: RateLimitPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rate !== 0) {
      writer.uint32(8).int64(message.rate);
    }
    if (message.intervalMs !== 0) {
      writer.uint32(16).int32(message.intervalMs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RateLimitPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRateLimitPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.rate = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.intervalMs = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RateLimitPolicy {
    return {
      rate: isSet(object.rate) ? globalThis.Number(object.rate) : 0,
      intervalMs: isSet(object.intervalMs) ? globalThis.Number(object.intervalMs) : 0,
    };
  },

  toJSON(message: RateLimitPolicy): unknown {
    const obj: any = {};
    if (message.rate !== 0) {
      obj.rate = Math.round(message.rate);
    }
    if (message.intervalMs !== 0) {
      obj.intervalMs = Math.round(message.intervalMs);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RateLimitPolicy>, I>>(base?: I): RateLimitPolicy {
    return RateLimitPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RateLimitPolicy>, I>>(object: I): RateLimitPolicy {
    const message = createBaseRateLimitPolicy();
    message.rate = object.rate ?? 0;
    message.intervalMs = object.intervalMs ?? 0;
    return message;
  },
};

function createBaseRateLimitRequest(): RateLimitRequest {
  return { key: "", score: 0, dryRun: false, policies: [], includePolicyEvaluations: false };
}

export const RateLimitRequest = {
  encode(message: RateLimitRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.score !== 0) {
      writer.uint32(16).int64(message.score);
    }
    if (message.dryRun !== false) {
      writer.uint32(24).bool(message.dryRun);
    }
    for (const v of message.policies) {
      RateLimitPolicy.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.includePolicyEvaluations !== false) {
      writer.uint32(40).bool(message.includePolicyEvaluations);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RateLimitRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRateLimitRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.score = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.dryRun = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.policies.push(RateLimitPolicy.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.includePolicyEvaluations = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RateLimitRequest {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      score: isSet(object.score) ? globalThis.Number(object.score) : 0,
      dryRun: isSet(object.dryRun) ? globalThis.Boolean(object.dryRun) : false,
      policies: globalThis.Array.isArray(object?.policies)
        ? object.policies.map((e: any) => RateLimitPolicy.fromJSON(e))
        : [],
      includePolicyEvaluations: isSet(object.includePolicyEvaluations)
        ? globalThis.Boolean(object.includePolicyEvaluations)
        : false,
    };
  },

  toJSON(message: RateLimitRequest): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.score !== 0) {
      obj.score = Math.round(message.score);
    }
    if (message.dryRun !== false) {
      obj.dryRun = message.dryRun;
    }
    if (message.policies?.length) {
      obj.policies = message.policies.map((e) => RateLimitPolicy.toJSON(e));
    }
    if (message.includePolicyEvaluations !== false) {
      obj.includePolicyEvaluations = message.includePolicyEvaluations;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RateLimitRequest>, I>>(base?: I): RateLimitRequest {
    return RateLimitRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RateLimitRequest>, I>>(object: I): RateLimitRequest {
    const message = createBaseRateLimitRequest();
    message.key = object.key ?? "";
    message.score = object.score ?? 0;
    message.dryRun = object.dryRun ?? false;
    message.policies = object.policies?.map((e) => RateLimitPolicy.fromPartial(e)) || [];
    message.includePolicyEvaluations = object.includePolicyEvaluations ?? false;
    return message;
  },
};

function createBaseRateLimitResponse(): RateLimitResponse {
  return { error: undefined, result: undefined };
}

export const RateLimitResponse = {
  encode(message: RateLimitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      RateLimitResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RateLimitResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRateLimitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = RateLimitResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RateLimitResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? RateLimitResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: RateLimitResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = RateLimitResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RateLimitResponse>, I>>(base?: I): RateLimitResponse {
    return RateLimitResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RateLimitResponse>, I>>(object: I): RateLimitResponse {
    const message = createBaseRateLimitResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? RateLimitResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseRateLimitPolicyEvaluation(): RateLimitPolicyEvaluation {
  return { allowed: false, tokensLeft: 0, allowedInMs: 0 };
}

export const RateLimitPolicyEvaluation = {
  encode(message: RateLimitPolicyEvaluation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.allowed !== false) {
      writer.uint32(8).bool(message.allowed);
    }
    if (message.tokensLeft !== 0) {
      writer.uint32(16).int64(message.tokensLeft);
    }
    if (message.allowedInMs !== 0) {
      writer.uint32(24).int32(message.allowedInMs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RateLimitPolicyEvaluation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRateLimitPolicyEvaluation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.allowed = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.tokensLeft = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.allowedInMs = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RateLimitPolicyEvaluation {
    return {
      allowed: isSet(object.allowed) ? globalThis.Boolean(object.allowed) : false,
      tokensLeft: isSet(object.tokensLeft) ? globalThis.Number(object.tokensLeft) : 0,
      allowedInMs: isSet(object.allowedInMs) ? globalThis.Number(object.allowedInMs) : 0,
    };
  },

  toJSON(message: RateLimitPolicyEvaluation): unknown {
    const obj: any = {};
    if (message.allowed !== false) {
      obj.allowed = message.allowed;
    }
    if (message.tokensLeft !== 0) {
      obj.tokensLeft = Math.round(message.tokensLeft);
    }
    if (message.allowedInMs !== 0) {
      obj.allowedInMs = Math.round(message.allowedInMs);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RateLimitPolicyEvaluation>, I>>(base?: I): RateLimitPolicyEvaluation {
    return RateLimitPolicyEvaluation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RateLimitPolicyEvaluation>, I>>(object: I): RateLimitPolicyEvaluation {
    const message = createBaseRateLimitPolicyEvaluation();
    message.allowed = object.allowed ?? false;
    message.tokensLeft = object.tokensLeft ?? 0;
    message.allowedInMs = object.allowedInMs ?? 0;
    return message;
  },
};

function createBaseRateLimitResult(): RateLimitResult {
  return { allowed: false, allowedInMs: 0, serverTimeMs: 0, policies: [] };
}

export const RateLimitResult = {
  encode(message: RateLimitResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.allowed !== false) {
      writer.uint32(8).bool(message.allowed);
    }
    if (message.allowedInMs !== 0) {
      writer.uint32(16).int32(message.allowedInMs);
    }
    if (message.serverTimeMs !== 0) {
      writer.uint32(24).int64(message.serverTimeMs);
    }
    for (const v of message.policies) {
      RateLimitPolicyEvaluation.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RateLimitResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRateLimitResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.allowed = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.allowedInMs = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.serverTimeMs = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.policies.push(RateLimitPolicyEvaluation.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RateLimitResult {
    return {
      allowed: isSet(object.allowed) ? globalThis.Boolean(object.allowed) : false,
      allowedInMs: isSet(object.allowedInMs) ? globalThis.Number(object.allowedInMs) : 0,
      serverTimeMs: isSet(object.serverTimeMs) ? globalThis.Number(object.serverTimeMs) : 0,
      policies: globalThis.Array.isArray(object?.policies)
        ? object.policies.map((e: any) => RateLimitPolicyEvaluation.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RateLimitResult): unknown {
    const obj: any = {};
    if (message.allowed !== false) {
      obj.allowed = message.allowed;
    }
    if (message.allowedInMs !== 0) {
      obj.allowedInMs = Math.round(message.allowedInMs);
    }
    if (message.serverTimeMs !== 0) {
      obj.serverTimeMs = Math.round(message.serverTimeMs);
    }
    if (message.policies?.length) {
      obj.policies = message.policies.map((e) => RateLimitPolicyEvaluation.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RateLimitResult>, I>>(base?: I): RateLimitResult {
    return RateLimitResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RateLimitResult>, I>>(object: I): RateLimitResult {
    const message = createBaseRateLimitResult();
    message.allowed = object.allowed ?? false;
    message.allowedInMs = object.allowedInMs ?? 0;
    message.serverTimeMs = object.serverTimeMs ?? 0;
    message.policies = object.policies?.map((e) => RateLimitPolicyEvaluation.fromPartial(e)) || [];
    return message;
  },
};

function createBaseResetRateLimitRequest(): ResetRateLimitRequest {
  return { key: "" };
}

export const ResetRateLimitRequest = {
  encode(message: ResetRateLimitRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResetRateLimitRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResetRateLimitRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResetRateLimitRequest {
    return { key: isSet(object.key) ? globalThis.String(object.key) : "" };
  },

  toJSON(message: ResetRateLimitRequest): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResetRateLimitRequest>, I>>(base?: I): ResetRateLimitRequest {
    return ResetRateLimitRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResetRateLimitRequest>, I>>(object: I): ResetRateLimitRequest {
    const message = createBaseResetRateLimitRequest();
    message.key = object.key ?? "";
    return message;
  },
};

function createBaseResetRateLimitResponse(): ResetRateLimitResponse {
  return { error: undefined, result: undefined };
}

export const ResetRateLimitResponse = {
  encode(message: ResetRateLimitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      ResetRateLimitResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResetRateLimitResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResetRateLimitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = Error.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = ResetRateLimitResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResetRateLimitResponse {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      result: isSet(object.result) ? ResetRateLimitResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: ResetRateLimitResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = Error.toJSON(message.error);
    }
    if (message.result !== undefined) {
      obj.result = ResetRateLimitResult.toJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResetRateLimitResponse>, I>>(base?: I): ResetRateLimitResponse {
    return ResetRateLimitResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResetRateLimitResponse>, I>>(object: I): ResetRateLimitResponse {
    const message = createBaseResetRateLimitResponse();
    message.error = (object.error !== undefined && object.error !== null) ? Error.fromPartial(object.error) : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? ResetRateLimitResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseResetRateLimitResult(): ResetRateLimitResult {
  return {};
}

export const ResetRateLimitResult = {
  encode(_: ResetRateLimitResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResetRateLimitResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResetRateLimitResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ResetRateLimitResult {
    return {};
  },

  toJSON(_: ResetRateLimitResult): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ResetRateLimitResult>, I>>(base?: I): ResetRateLimitResult {
    return ResetRateLimitResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResetRateLimitResult>, I>>(_: I): ResetRateLimitResult {
    const message = createBaseResetRateLimitResult();
    return message;
  },
};

export type CentrifugoApiService = typeof CentrifugoApiService;
export const CentrifugoApiService = {
  batch: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/Batch",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: BatchRequest) => Buffer.from(BatchRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => BatchRequest.decode(value),
    responseSerialize: (value: BatchResponse) => Buffer.from(BatchResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => BatchResponse.decode(value),
  },
  publish: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/Publish",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: PublishRequest) => Buffer.from(PublishRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => PublishRequest.decode(value),
    responseSerialize: (value: PublishResponse) => Buffer.from(PublishResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => PublishResponse.decode(value),
  },
  broadcast: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/Broadcast",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: BroadcastRequest) => Buffer.from(BroadcastRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => BroadcastRequest.decode(value),
    responseSerialize: (value: BroadcastResponse) => Buffer.from(BroadcastResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => BroadcastResponse.decode(value),
  },
  subscribe: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/Subscribe",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SubscribeRequest) => Buffer.from(SubscribeRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SubscribeRequest.decode(value),
    responseSerialize: (value: SubscribeResponse) => Buffer.from(SubscribeResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SubscribeResponse.decode(value),
  },
  unsubscribe: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/Unsubscribe",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UnsubscribeRequest) => Buffer.from(UnsubscribeRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UnsubscribeRequest.decode(value),
    responseSerialize: (value: UnsubscribeResponse) => Buffer.from(UnsubscribeResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UnsubscribeResponse.decode(value),
  },
  disconnect: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/Disconnect",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DisconnectRequest) => Buffer.from(DisconnectRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DisconnectRequest.decode(value),
    responseSerialize: (value: DisconnectResponse) => Buffer.from(DisconnectResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DisconnectResponse.decode(value),
  },
  presence: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/Presence",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: PresenceRequest) => Buffer.from(PresenceRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => PresenceRequest.decode(value),
    responseSerialize: (value: PresenceResponse) => Buffer.from(PresenceResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => PresenceResponse.decode(value),
  },
  presenceStats: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/PresenceStats",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: PresenceStatsRequest) => Buffer.from(PresenceStatsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => PresenceStatsRequest.decode(value),
    responseSerialize: (value: PresenceStatsResponse) => Buffer.from(PresenceStatsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => PresenceStatsResponse.decode(value),
  },
  history: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/History",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: HistoryRequest) => Buffer.from(HistoryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => HistoryRequest.decode(value),
    responseSerialize: (value: HistoryResponse) => Buffer.from(HistoryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HistoryResponse.decode(value),
  },
  historyRemove: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/HistoryRemove",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: HistoryRemoveRequest) => Buffer.from(HistoryRemoveRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => HistoryRemoveRequest.decode(value),
    responseSerialize: (value: HistoryRemoveResponse) => Buffer.from(HistoryRemoveResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HistoryRemoveResponse.decode(value),
  },
  info: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/Info",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: InfoRequest) => Buffer.from(InfoRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => InfoRequest.decode(value),
    responseSerialize: (value: InfoResponse) => Buffer.from(InfoResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => InfoResponse.decode(value),
  },
  rpc: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/RPC",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RPCRequest) => Buffer.from(RPCRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RPCRequest.decode(value),
    responseSerialize: (value: RPCResponse) => Buffer.from(RPCResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RPCResponse.decode(value),
  },
  refresh: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/Refresh",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RefreshRequest) => Buffer.from(RefreshRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RefreshRequest.decode(value),
    responseSerialize: (value: RefreshResponse) => Buffer.from(RefreshResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RefreshResponse.decode(value),
  },
  channels: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/Channels",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ChannelsRequest) => Buffer.from(ChannelsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ChannelsRequest.decode(value),
    responseSerialize: (value: ChannelsResponse) => Buffer.from(ChannelsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ChannelsResponse.decode(value),
  },
  connections: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/Connections",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ConnectionsRequest) => Buffer.from(ConnectionsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ConnectionsRequest.decode(value),
    responseSerialize: (value: ConnectionsResponse) => Buffer.from(ConnectionsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ConnectionsResponse.decode(value),
  },
  updateUserStatus: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/UpdateUserStatus",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateUserStatusRequest) => Buffer.from(UpdateUserStatusRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateUserStatusRequest.decode(value),
    responseSerialize: (value: UpdateUserStatusResponse) =>
      Buffer.from(UpdateUserStatusResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateUserStatusResponse.decode(value),
  },
  getUserStatus: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/GetUserStatus",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetUserStatusRequest) => Buffer.from(GetUserStatusRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetUserStatusRequest.decode(value),
    responseSerialize: (value: GetUserStatusResponse) => Buffer.from(GetUserStatusResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetUserStatusResponse.decode(value),
  },
  deleteUserStatus: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/DeleteUserStatus",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteUserStatusRequest) => Buffer.from(DeleteUserStatusRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteUserStatusRequest.decode(value),
    responseSerialize: (value: DeleteUserStatusResponse) =>
      Buffer.from(DeleteUserStatusResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteUserStatusResponse.decode(value),
  },
  blockUser: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/BlockUser",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: BlockUserRequest) => Buffer.from(BlockUserRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => BlockUserRequest.decode(value),
    responseSerialize: (value: BlockUserResponse) => Buffer.from(BlockUserResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => BlockUserResponse.decode(value),
  },
  unblockUser: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/UnblockUser",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UnblockUserRequest) => Buffer.from(UnblockUserRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UnblockUserRequest.decode(value),
    responseSerialize: (value: UnblockUserResponse) => Buffer.from(UnblockUserResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UnblockUserResponse.decode(value),
  },
  revokeToken: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/RevokeToken",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RevokeTokenRequest) => Buffer.from(RevokeTokenRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RevokeTokenRequest.decode(value),
    responseSerialize: (value: RevokeTokenResponse) => Buffer.from(RevokeTokenResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RevokeTokenResponse.decode(value),
  },
  invalidateUserTokens: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/InvalidateUserTokens",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: InvalidateUserTokensRequest) =>
      Buffer.from(InvalidateUserTokensRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => InvalidateUserTokensRequest.decode(value),
    responseSerialize: (value: InvalidateUserTokensResponse) =>
      Buffer.from(InvalidateUserTokensResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => InvalidateUserTokensResponse.decode(value),
  },
  deviceRegister: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/DeviceRegister",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeviceRegisterRequest) => Buffer.from(DeviceRegisterRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeviceRegisterRequest.decode(value),
    responseSerialize: (value: DeviceRegisterResponse) => Buffer.from(DeviceRegisterResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeviceRegisterResponse.decode(value),
  },
  deviceUpdate: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/DeviceUpdate",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeviceUpdateRequest) => Buffer.from(DeviceUpdateRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeviceUpdateRequest.decode(value),
    responseSerialize: (value: DeviceUpdateResponse) => Buffer.from(DeviceUpdateResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeviceUpdateResponse.decode(value),
  },
  deviceRemove: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/DeviceRemove",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeviceRemoveRequest) => Buffer.from(DeviceRemoveRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeviceRemoveRequest.decode(value),
    responseSerialize: (value: DeviceRemoveResponse) => Buffer.from(DeviceRemoveResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeviceRemoveResponse.decode(value),
  },
  deviceList: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/DeviceList",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeviceListRequest) => Buffer.from(DeviceListRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeviceListRequest.decode(value),
    responseSerialize: (value: DeviceListResponse) => Buffer.from(DeviceListResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeviceListResponse.decode(value),
  },
  deviceTopicList: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/DeviceTopicList",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeviceTopicListRequest) => Buffer.from(DeviceTopicListRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeviceTopicListRequest.decode(value),
    responseSerialize: (value: DeviceTopicListResponse) => Buffer.from(DeviceTopicListResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeviceTopicListResponse.decode(value),
  },
  deviceTopicUpdate: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/DeviceTopicUpdate",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeviceTopicUpdateRequest) => Buffer.from(DeviceTopicUpdateRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeviceTopicUpdateRequest.decode(value),
    responseSerialize: (value: DeviceTopicUpdateResponse) =>
      Buffer.from(DeviceTopicUpdateResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeviceTopicUpdateResponse.decode(value),
  },
  userTopicList: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/UserTopicList",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UserTopicListRequest) => Buffer.from(UserTopicListRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UserTopicListRequest.decode(value),
    responseSerialize: (value: UserTopicListResponse) => Buffer.from(UserTopicListResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UserTopicListResponse.decode(value),
  },
  userTopicUpdate: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/UserTopicUpdate",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UserTopicUpdateRequest) => Buffer.from(UserTopicUpdateRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UserTopicUpdateRequest.decode(value),
    responseSerialize: (value: UserTopicUpdateResponse) => Buffer.from(UserTopicUpdateResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UserTopicUpdateResponse.decode(value),
  },
  sendPushNotification: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/SendPushNotification",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SendPushNotificationRequest) =>
      Buffer.from(SendPushNotificationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SendPushNotificationRequest.decode(value),
    responseSerialize: (value: SendPushNotificationResponse) =>
      Buffer.from(SendPushNotificationResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SendPushNotificationResponse.decode(value),
  },
  updatePushStatus: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/UpdatePushStatus",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdatePushStatusRequest) => Buffer.from(UpdatePushStatusRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdatePushStatusRequest.decode(value),
    responseSerialize: (value: UpdatePushStatusResponse) =>
      Buffer.from(UpdatePushStatusResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdatePushStatusResponse.decode(value),
  },
  cancelPush: {
    path: "/centrifugal.centrifugo.api.CentrifugoApi/CancelPush",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CancelPushRequest) => Buffer.from(CancelPushRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CancelPushRequest.decode(value),
    responseSerialize: (value: CancelPushResponse) => Buffer.from(CancelPushResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CancelPushResponse.decode(value),
  },
} as const;

export interface CentrifugoApiServer extends UntypedServiceImplementation {
  batch: handleUnaryCall<BatchRequest, BatchResponse>;
  publish: handleUnaryCall<PublishRequest, PublishResponse>;
  broadcast: handleUnaryCall<BroadcastRequest, BroadcastResponse>;
  subscribe: handleUnaryCall<SubscribeRequest, SubscribeResponse>;
  unsubscribe: handleUnaryCall<UnsubscribeRequest, UnsubscribeResponse>;
  disconnect: handleUnaryCall<DisconnectRequest, DisconnectResponse>;
  presence: handleUnaryCall<PresenceRequest, PresenceResponse>;
  presenceStats: handleUnaryCall<PresenceStatsRequest, PresenceStatsResponse>;
  history: handleUnaryCall<HistoryRequest, HistoryResponse>;
  historyRemove: handleUnaryCall<HistoryRemoveRequest, HistoryRemoveResponse>;
  info: handleUnaryCall<InfoRequest, InfoResponse>;
  rpc: handleUnaryCall<RPCRequest, RPCResponse>;
  refresh: handleUnaryCall<RefreshRequest, RefreshResponse>;
  channels: handleUnaryCall<ChannelsRequest, ChannelsResponse>;
  connections: handleUnaryCall<ConnectionsRequest, ConnectionsResponse>;
  updateUserStatus: handleUnaryCall<UpdateUserStatusRequest, UpdateUserStatusResponse>;
  getUserStatus: handleUnaryCall<GetUserStatusRequest, GetUserStatusResponse>;
  deleteUserStatus: handleUnaryCall<DeleteUserStatusRequest, DeleteUserStatusResponse>;
  blockUser: handleUnaryCall<BlockUserRequest, BlockUserResponse>;
  unblockUser: handleUnaryCall<UnblockUserRequest, UnblockUserResponse>;
  revokeToken: handleUnaryCall<RevokeTokenRequest, RevokeTokenResponse>;
  invalidateUserTokens: handleUnaryCall<InvalidateUserTokensRequest, InvalidateUserTokensResponse>;
  deviceRegister: handleUnaryCall<DeviceRegisterRequest, DeviceRegisterResponse>;
  deviceUpdate: handleUnaryCall<DeviceUpdateRequest, DeviceUpdateResponse>;
  deviceRemove: handleUnaryCall<DeviceRemoveRequest, DeviceRemoveResponse>;
  deviceList: handleUnaryCall<DeviceListRequest, DeviceListResponse>;
  deviceTopicList: handleUnaryCall<DeviceTopicListRequest, DeviceTopicListResponse>;
  deviceTopicUpdate: handleUnaryCall<DeviceTopicUpdateRequest, DeviceTopicUpdateResponse>;
  userTopicList: handleUnaryCall<UserTopicListRequest, UserTopicListResponse>;
  userTopicUpdate: handleUnaryCall<UserTopicUpdateRequest, UserTopicUpdateResponse>;
  sendPushNotification: handleUnaryCall<SendPushNotificationRequest, SendPushNotificationResponse>;
  updatePushStatus: handleUnaryCall<UpdatePushStatusRequest, UpdatePushStatusResponse>;
  cancelPush: handleUnaryCall<CancelPushRequest, CancelPushResponse>;
}

export interface CentrifugoApiClient extends Client {
  batch(
    request: BatchRequest,
    callback: (error: ServiceError | null, response: BatchResponse) => void,
  ): ClientUnaryCall;
  batch(
    request: BatchRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: BatchResponse) => void,
  ): ClientUnaryCall;
  batch(
    request: BatchRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: BatchResponse) => void,
  ): ClientUnaryCall;
  publish(
    request: PublishRequest,
    callback: (error: ServiceError | null, response: PublishResponse) => void,
  ): ClientUnaryCall;
  publish(
    request: PublishRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: PublishResponse) => void,
  ): ClientUnaryCall;
  publish(
    request: PublishRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: PublishResponse) => void,
  ): ClientUnaryCall;
  broadcast(
    request: BroadcastRequest,
    callback: (error: ServiceError | null, response: BroadcastResponse) => void,
  ): ClientUnaryCall;
  broadcast(
    request: BroadcastRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: BroadcastResponse) => void,
  ): ClientUnaryCall;
  broadcast(
    request: BroadcastRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: BroadcastResponse) => void,
  ): ClientUnaryCall;
  subscribe(
    request: SubscribeRequest,
    callback: (error: ServiceError | null, response: SubscribeResponse) => void,
  ): ClientUnaryCall;
  subscribe(
    request: SubscribeRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SubscribeResponse) => void,
  ): ClientUnaryCall;
  subscribe(
    request: SubscribeRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SubscribeResponse) => void,
  ): ClientUnaryCall;
  unsubscribe(
    request: UnsubscribeRequest,
    callback: (error: ServiceError | null, response: UnsubscribeResponse) => void,
  ): ClientUnaryCall;
  unsubscribe(
    request: UnsubscribeRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UnsubscribeResponse) => void,
  ): ClientUnaryCall;
  unsubscribe(
    request: UnsubscribeRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UnsubscribeResponse) => void,
  ): ClientUnaryCall;
  disconnect(
    request: DisconnectRequest,
    callback: (error: ServiceError | null, response: DisconnectResponse) => void,
  ): ClientUnaryCall;
  disconnect(
    request: DisconnectRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DisconnectResponse) => void,
  ): ClientUnaryCall;
  disconnect(
    request: DisconnectRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DisconnectResponse) => void,
  ): ClientUnaryCall;
  presence(
    request: PresenceRequest,
    callback: (error: ServiceError | null, response: PresenceResponse) => void,
  ): ClientUnaryCall;
  presence(
    request: PresenceRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: PresenceResponse) => void,
  ): ClientUnaryCall;
  presence(
    request: PresenceRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: PresenceResponse) => void,
  ): ClientUnaryCall;
  presenceStats(
    request: PresenceStatsRequest,
    callback: (error: ServiceError | null, response: PresenceStatsResponse) => void,
  ): ClientUnaryCall;
  presenceStats(
    request: PresenceStatsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: PresenceStatsResponse) => void,
  ): ClientUnaryCall;
  presenceStats(
    request: PresenceStatsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: PresenceStatsResponse) => void,
  ): ClientUnaryCall;
  history(
    request: HistoryRequest,
    callback: (error: ServiceError | null, response: HistoryResponse) => void,
  ): ClientUnaryCall;
  history(
    request: HistoryRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: HistoryResponse) => void,
  ): ClientUnaryCall;
  history(
    request: HistoryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: HistoryResponse) => void,
  ): ClientUnaryCall;
  historyRemove(
    request: HistoryRemoveRequest,
    callback: (error: ServiceError | null, response: HistoryRemoveResponse) => void,
  ): ClientUnaryCall;
  historyRemove(
    request: HistoryRemoveRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: HistoryRemoveResponse) => void,
  ): ClientUnaryCall;
  historyRemove(
    request: HistoryRemoveRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: HistoryRemoveResponse) => void,
  ): ClientUnaryCall;
  info(request: InfoRequest, callback: (error: ServiceError | null, response: InfoResponse) => void): ClientUnaryCall;
  info(
    request: InfoRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: InfoResponse) => void,
  ): ClientUnaryCall;
  info(
    request: InfoRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: InfoResponse) => void,
  ): ClientUnaryCall;
  rpc(request: RPCRequest, callback: (error: ServiceError | null, response: RPCResponse) => void): ClientUnaryCall;
  rpc(
    request: RPCRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: RPCResponse) => void,
  ): ClientUnaryCall;
  rpc(
    request: RPCRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: RPCResponse) => void,
  ): ClientUnaryCall;
  refresh(
    request: RefreshRequest,
    callback: (error: ServiceError | null, response: RefreshResponse) => void,
  ): ClientUnaryCall;
  refresh(
    request: RefreshRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: RefreshResponse) => void,
  ): ClientUnaryCall;
  refresh(
    request: RefreshRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: RefreshResponse) => void,
  ): ClientUnaryCall;
  channels(
    request: ChannelsRequest,
    callback: (error: ServiceError | null, response: ChannelsResponse) => void,
  ): ClientUnaryCall;
  channels(
    request: ChannelsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ChannelsResponse) => void,
  ): ClientUnaryCall;
  channels(
    request: ChannelsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ChannelsResponse) => void,
  ): ClientUnaryCall;
  connections(
    request: ConnectionsRequest,
    callback: (error: ServiceError | null, response: ConnectionsResponse) => void,
  ): ClientUnaryCall;
  connections(
    request: ConnectionsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ConnectionsResponse) => void,
  ): ClientUnaryCall;
  connections(
    request: ConnectionsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ConnectionsResponse) => void,
  ): ClientUnaryCall;
  updateUserStatus(
    request: UpdateUserStatusRequest,
    callback: (error: ServiceError | null, response: UpdateUserStatusResponse) => void,
  ): ClientUnaryCall;
  updateUserStatus(
    request: UpdateUserStatusRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateUserStatusResponse) => void,
  ): ClientUnaryCall;
  updateUserStatus(
    request: UpdateUserStatusRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateUserStatusResponse) => void,
  ): ClientUnaryCall;
  getUserStatus(
    request: GetUserStatusRequest,
    callback: (error: ServiceError | null, response: GetUserStatusResponse) => void,
  ): ClientUnaryCall;
  getUserStatus(
    request: GetUserStatusRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetUserStatusResponse) => void,
  ): ClientUnaryCall;
  getUserStatus(
    request: GetUserStatusRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetUserStatusResponse) => void,
  ): ClientUnaryCall;
  deleteUserStatus(
    request: DeleteUserStatusRequest,
    callback: (error: ServiceError | null, response: DeleteUserStatusResponse) => void,
  ): ClientUnaryCall;
  deleteUserStatus(
    request: DeleteUserStatusRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteUserStatusResponse) => void,
  ): ClientUnaryCall;
  deleteUserStatus(
    request: DeleteUserStatusRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteUserStatusResponse) => void,
  ): ClientUnaryCall;
  blockUser(
    request: BlockUserRequest,
    callback: (error: ServiceError | null, response: BlockUserResponse) => void,
  ): ClientUnaryCall;
  blockUser(
    request: BlockUserRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: BlockUserResponse) => void,
  ): ClientUnaryCall;
  blockUser(
    request: BlockUserRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: BlockUserResponse) => void,
  ): ClientUnaryCall;
  unblockUser(
    request: UnblockUserRequest,
    callback: (error: ServiceError | null, response: UnblockUserResponse) => void,
  ): ClientUnaryCall;
  unblockUser(
    request: UnblockUserRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UnblockUserResponse) => void,
  ): ClientUnaryCall;
  unblockUser(
    request: UnblockUserRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UnblockUserResponse) => void,
  ): ClientUnaryCall;
  revokeToken(
    request: RevokeTokenRequest,
    callback: (error: ServiceError | null, response: RevokeTokenResponse) => void,
  ): ClientUnaryCall;
  revokeToken(
    request: RevokeTokenRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: RevokeTokenResponse) => void,
  ): ClientUnaryCall;
  revokeToken(
    request: RevokeTokenRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: RevokeTokenResponse) => void,
  ): ClientUnaryCall;
  invalidateUserTokens(
    request: InvalidateUserTokensRequest,
    callback: (error: ServiceError | null, response: InvalidateUserTokensResponse) => void,
  ): ClientUnaryCall;
  invalidateUserTokens(
    request: InvalidateUserTokensRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: InvalidateUserTokensResponse) => void,
  ): ClientUnaryCall;
  invalidateUserTokens(
    request: InvalidateUserTokensRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: InvalidateUserTokensResponse) => void,
  ): ClientUnaryCall;
  deviceRegister(
    request: DeviceRegisterRequest,
    callback: (error: ServiceError | null, response: DeviceRegisterResponse) => void,
  ): ClientUnaryCall;
  deviceRegister(
    request: DeviceRegisterRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeviceRegisterResponse) => void,
  ): ClientUnaryCall;
  deviceRegister(
    request: DeviceRegisterRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeviceRegisterResponse) => void,
  ): ClientUnaryCall;
  deviceUpdate(
    request: DeviceUpdateRequest,
    callback: (error: ServiceError | null, response: DeviceUpdateResponse) => void,
  ): ClientUnaryCall;
  deviceUpdate(
    request: DeviceUpdateRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeviceUpdateResponse) => void,
  ): ClientUnaryCall;
  deviceUpdate(
    request: DeviceUpdateRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeviceUpdateResponse) => void,
  ): ClientUnaryCall;
  deviceRemove(
    request: DeviceRemoveRequest,
    callback: (error: ServiceError | null, response: DeviceRemoveResponse) => void,
  ): ClientUnaryCall;
  deviceRemove(
    request: DeviceRemoveRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeviceRemoveResponse) => void,
  ): ClientUnaryCall;
  deviceRemove(
    request: DeviceRemoveRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeviceRemoveResponse) => void,
  ): ClientUnaryCall;
  deviceList(
    request: DeviceListRequest,
    callback: (error: ServiceError | null, response: DeviceListResponse) => void,
  ): ClientUnaryCall;
  deviceList(
    request: DeviceListRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeviceListResponse) => void,
  ): ClientUnaryCall;
  deviceList(
    request: DeviceListRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeviceListResponse) => void,
  ): ClientUnaryCall;
  deviceTopicList(
    request: DeviceTopicListRequest,
    callback: (error: ServiceError | null, response: DeviceTopicListResponse) => void,
  ): ClientUnaryCall;
  deviceTopicList(
    request: DeviceTopicListRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeviceTopicListResponse) => void,
  ): ClientUnaryCall;
  deviceTopicList(
    request: DeviceTopicListRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeviceTopicListResponse) => void,
  ): ClientUnaryCall;
  deviceTopicUpdate(
    request: DeviceTopicUpdateRequest,
    callback: (error: ServiceError | null, response: DeviceTopicUpdateResponse) => void,
  ): ClientUnaryCall;
  deviceTopicUpdate(
    request: DeviceTopicUpdateRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeviceTopicUpdateResponse) => void,
  ): ClientUnaryCall;
  deviceTopicUpdate(
    request: DeviceTopicUpdateRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeviceTopicUpdateResponse) => void,
  ): ClientUnaryCall;
  userTopicList(
    request: UserTopicListRequest,
    callback: (error: ServiceError | null, response: UserTopicListResponse) => void,
  ): ClientUnaryCall;
  userTopicList(
    request: UserTopicListRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UserTopicListResponse) => void,
  ): ClientUnaryCall;
  userTopicList(
    request: UserTopicListRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UserTopicListResponse) => void,
  ): ClientUnaryCall;
  userTopicUpdate(
    request: UserTopicUpdateRequest,
    callback: (error: ServiceError | null, response: UserTopicUpdateResponse) => void,
  ): ClientUnaryCall;
  userTopicUpdate(
    request: UserTopicUpdateRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UserTopicUpdateResponse) => void,
  ): ClientUnaryCall;
  userTopicUpdate(
    request: UserTopicUpdateRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UserTopicUpdateResponse) => void,
  ): ClientUnaryCall;
  sendPushNotification(
    request: SendPushNotificationRequest,
    callback: (error: ServiceError | null, response: SendPushNotificationResponse) => void,
  ): ClientUnaryCall;
  sendPushNotification(
    request: SendPushNotificationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SendPushNotificationResponse) => void,
  ): ClientUnaryCall;
  sendPushNotification(
    request: SendPushNotificationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SendPushNotificationResponse) => void,
  ): ClientUnaryCall;
  updatePushStatus(
    request: UpdatePushStatusRequest,
    callback: (error: ServiceError | null, response: UpdatePushStatusResponse) => void,
  ): ClientUnaryCall;
  updatePushStatus(
    request: UpdatePushStatusRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdatePushStatusResponse) => void,
  ): ClientUnaryCall;
  updatePushStatus(
    request: UpdatePushStatusRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdatePushStatusResponse) => void,
  ): ClientUnaryCall;
  cancelPush(
    request: CancelPushRequest,
    callback: (error: ServiceError | null, response: CancelPushResponse) => void,
  ): ClientUnaryCall;
  cancelPush(
    request: CancelPushRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CancelPushResponse) => void,
  ): ClientUnaryCall;
  cancelPush(
    request: CancelPushRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CancelPushResponse) => void,
  ): ClientUnaryCall;
}

export const CentrifugoApiClient = makeGenericClientConstructor(
  CentrifugoApiService,
  "centrifugal.centrifugo.api.CentrifugoApi",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): CentrifugoApiClient;
  service: typeof CentrifugoApiService;
  serviceName: string;
};

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
