export const STATUSES = {
  OTP_SENT: "OTP_SENT", // sent one time password and doc address to client via mail
  CLIENT_VIEWED_DOC: "CLIENT_VIEWED_DOC", // client viewed the document
  YOUR_TURN: "YOUR_TURN", // client has edited the document for last
  FOLLOWUP_EMAIL: "FOLLOWUP_EMAIL", 
  FINALIZED: "FINALIZED", 
  REJECTED: "REJECTED", 
};

export const INITIAL_STATUSES = {
  OTP_SENT: false,
  CLIENT_VIEWED_DOC: false,
  YOUR_TURN: false,
  FOLLOWUP_EMAIL: false,
  FINALIZED: false,
  REJECTED: false,
}