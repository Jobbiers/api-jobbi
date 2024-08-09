interface successProps {
    data?: any;
    message: string;
    status: number;
}
interface errorProps {
    error: any;
    message: string;
    status: number;
}

export class ResponseHandler {  
  static success({data, message = 'Operation successful', status = 200}: successProps) {
    return {
      status,
      message,
      data,
    };
  }

  static error({error, message = 'Operation failed', status = 500}: errorProps) {
    return {
      status,
      message,
      error: error.message || error,
    };
  }
}
