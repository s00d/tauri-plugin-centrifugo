use serde::{ser::Serializer, Serialize};

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("Centrifugo error: {0}")]
    Centrifugo(String),
    
    #[error("Connection error: {0}")]
    Connection(String),
    
    #[error("Channel error: {0}")]
    Channel(String),
    
    #[error("Serialization error: {0}")]
    Serialization(String),
    
    #[error("Configuration error: {0}")]
    Configuration(String),
    
    #[error("Not connected to Centrifugo")]
    NotConnected,
    
    #[error("Channel not found: {0}")]
    ChannelNotFound(String),
    
    #[error("Not implemented: {0}")]
    NotImplemented(String),
}

impl Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_str())
    }
}

impl From<base64::DecodeError> for Error {
    fn from(err: base64::DecodeError) -> Self {
        Error::Serialization(format!("Base64 decode error: {}", err))
    }
}

impl From<tokio_centrifuge::client::RequestError> for Error {
    fn from(err: tokio_centrifuge::client::RequestError) -> Self {
        Error::Centrifugo(format!("Request error: {:?}", err))
    }
}

pub type Result<T> = std::result::Result<T, Error>;
