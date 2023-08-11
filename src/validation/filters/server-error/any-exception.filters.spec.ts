import { HttpException } from '@nestjs/common';
import AnyExceptionFilter from './any-exception.filters';

describe('AnyExceptionFilter', () => {
  let jsonMock;
  let statusMock;
  let host;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({
      json: jsonMock,
    });

    host = {
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
      getType: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue({
          status: statusMock,
        }),
      }),
    };
  });

  it("sets the error's status on the response with the value from the exception when http exception", () => {
    const statusError = 400;

    const httpException = new HttpException(
      { message: 'message', name: 'name' },
      statusError,
    );
    new AnyExceptionFilter().catch(httpException, host);

    expect(statusMock).toHaveBeenCalledWith(statusError);
    expect(jsonMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ status: statusError }),
    );
  });

  it("sets the error's status on the response with internal server error when is a generic exception", () => {
    const statusInternalServerError = 500;

    const anyException = { message: 'message', name: 'name' };
    new AnyExceptionFilter().catch(anyException, host);

    expect(statusMock).toHaveBeenCalledWith(statusInternalServerError);
    expect(jsonMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ status: statusInternalServerError }),
    );
  });

  it("sets the error's message on the response", () => {
    const anyException = { message: 'message', name: 'name' };
    new AnyExceptionFilter().catch(anyException, host);

    expect(jsonMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ message: 'message' }),
    );
  });

  it("sets the error's name on the response", () => {
    const anyException = { message: 'message', name: 'name' };
    new AnyExceptionFilter().catch(anyException, host);

    expect(jsonMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ name: 'name' }),
    );
  });
});
