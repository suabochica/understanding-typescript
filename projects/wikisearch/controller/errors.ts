
/**
 * This is returned when there a network failure is encountered
 * or if anything prevented the request from being completed.
 */
export class NetworkError extends Error {
    readonly _tag = 'NetworkError';

    public constructor(message = '') {
        super(message);
    }
}

/**
 * There is returned when response parser is unable to convert
 * response body to the desired format.
 */
export class ParseError extends Error {
    readonly _tag = 'ParseError';

    public constructor(message = '') {
        super(message);
    }
}
