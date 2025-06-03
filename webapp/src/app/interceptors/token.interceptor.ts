import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token')
  if(token){
    req=req.clone({
      setHeaders:{
        Authorization:token,
      },
    });
  }
  return next(req);
};
