const RequestLogs = require('./models').request_logs;
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

morgan.token('req-body', (req) => JSON.stringify(req.body));
morgan.token('res-body', (req, res) => res._body ? JSON.stringify(res._body) : '');
morgan.token('user', (req) => {
  if (req.user) {
    return JSON.stringify({ id: req.user.id, email: req.user.email });
  }
  return 'Unauthenticated';
});
morgan.token('ip', (req) => req.ip || req.remoteAddress);
morgan.token('date', () => new Date().toLocaleString());
morgan.token('user-agent', (req) => req.headers['user-agent'] || 'Unknown');

const responseBodyMiddleware = (req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    res._body = body;
    return originalSend.apply(this, arguments);
  };
  next();
};

const setUserMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }
  next();
};

const customFormat = (tokens, req, res) => {
    const logEntry = {
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      date: tokens.date(req, res),
      ip: tokens.ip(req, res),
      status: tokens.status(req, res),
      response_time: tokens['response-time'](req, res),
      user_agent: tokens['user-agent'](req, res),
      user: tokens.user(req, res),
      req_body: tokens['req-body'](req, res),
      res_body: tokens['res-body'](req, res)
    };
  
    logToDatabase(logEntry);
  
    return [
      `Method: ${logEntry.method}`,
      `URL: ${logEntry.url}`,
      `Date: ${logEntry.date}`,
      `IP: ${logEntry.ip}`,
      `Status: ${logEntry.status}`,
      `Response Time: ${logEntry.response_time} ms`,
      `User-Agent: ${logEntry.user_agent}`,
      `User: ${logEntry.user}`,
      `Req Body: ${logEntry.req_body}`,
      `Res Body: ${logEntry.res_body}`
    ].join(' | ');
};

const logToDatabase = async (logEntry) => {
    try {
        if ((logEntry.method === 'PUT' || logEntry.method === 'POST' || logEntry.method === 'DELETE') 
            && logEntry.status === 200) {
            await RequestLogs.create({
                method: logEntry.method,
                url: logEntry.url,
                ip: logEntry.ip,
                status: logEntry.status,
                response_time: `${logEntry.response_time} ms`,
                user_agent: logEntry.user_agent,
                user: logEntry.user,
                req_body: logEntry.req_body,
                res_body: logEntry.res_body
            })
        };
    } catch (error) {
      console.error('Error logging to database:', error);
    }
};

module.exports = {
  logger: morgan(customFormat, { stream: accessLogStream }),
  responseBodyMiddleware,
  setUserMiddleware,
};
