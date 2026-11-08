//! # Error Handling
//!
//! This module defines custom error types for the Centrifugo plugin.
//! All errors implement `Serialize` for frontend communication and
//! provide meaningful error messages.
//!
//! ## Error Types
//!
//! - `NotConnected`: Attempted operation without active connection
//! - `SerializationError`: Data serialization/deserialization failures
//! - `CentrifugoError`: Errors from the Centrifugo server
//! - `Base64Error`: Base64 encoding/decoding errors
//! - `RequestError`: Errors from Centrifugo client operations

use serde::Serialize;
use thiserror::Error;

/// Custom result type for the plugin
pub type Result<T> = std::result::Result<T, Error>;

/// Main error enum for the Centrifugo plugin
///
/// All errors implement `Serialize` to allow communication with the frontend.
/// Error messages are designed to be user-friendly and actionable.
#[derive(Debug, Error, Serialize)]
pub enum Error {
    /// Attempted to perform an operation without an active connection
    #[error("Not connected to Centrifugo server")]
    NotConnected,

    /// Serialization or deserialization error
    #[error("Serialization error: {0}")]
    SerializationError(String),

    /// Error from Centrifugo server
    #[error("Centrifugo error: {0}")]
    CentrifugoError(String),

    /// Base64 encoding/decoding error
    #[error("Base64 error: {0}")]
    Base64Error(String),

    /// Error from Centrifugo client operations
    #[error("Request error: {0}")]
    RequestError(String),

    /// Feature not supported by the centrifuge-client SDK
    #[error("Not supported: {0}")]
    Unsupported(&'static str),
}

impl From<serde_json::Error> for Error {
    fn from(err: serde_json::Error) -> Self {
        Error::SerializationError(err.to_string())
    }
}

impl From<base64::DecodeError> for Error {
    fn from(err: base64::DecodeError) -> Self {
        Error::Base64Error(err.to_string())
    }
}

impl From<centrifuge::Error> for Error {
    fn from(err: centrifuge::Error) -> Self {
        match err {
            centrifuge::Error::ClientDisconnected | centrifuge::Error::ClientClosed => {
                Error::NotConnected
            }
            centrifuge::Error::Server(e) => Error::CentrifugoError(e.to_string()),
            e => Error::RequestError(e.to_string()),
        }
    }
}
