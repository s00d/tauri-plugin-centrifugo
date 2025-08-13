//! # Error Handling
//!
//! This module defines custom error types for the Centrifugo plugin.
//! All errors implement `Serialize` for frontend communication and
//! provide meaningful error messages.
//!
//! ## Error Types
//!
//! - `NotConnected`: Attempted operation without active connection
//! - `NotImplemented`: Feature not supported by tokio-centrifuge
//! - `SerializationError`: Data serialization/deserialization failures
//! - `CentrifugoError`: Errors from the Centrifugo server
//! - `Base64Error`: Base64 encoding/decoding errors
//! - `RequestError`: Errors from tokio-centrifuge client operations

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

    /// Feature is not implemented or supported by tokio-centrifuge
    #[error("Feature not implemented: {0}")]
    NotImplemented(String),

    /// Serialization or deserialization error
    #[error("Serialization error: {0}")]
    SerializationError(String),

    /// Error from Centrifugo server
    #[error("Centrifugo error: {0}")]
    CentrifugoError(String),

    /// Base64 encoding/decoding error
    #[error("Base64 error: {0}")]
    Base64Error(String),

    /// Error from tokio-centrifuge client operations
    #[error("Request error: {0}")]
    RequestError(String),
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

impl From<tokio_centrifuge::client::RequestError> for Error {
    fn from(err: tokio_centrifuge::client::RequestError) -> Self {
        Error::RequestError(err.to_string())
    }
}
