
export function validationError(res:any, message:string) {
    return res.status(400).json({
        errors:[message],
        message
    })
   
  };