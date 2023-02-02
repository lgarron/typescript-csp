import { CSP } from ".";

// This should be accepted by the type checker.
const blankCSP: CSP = {
}

const myCSP: CSP = {
  'default-src': ["'unsafe-inline'", "'strict-dynamic'"],
};
