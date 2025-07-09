        import { Request, Response, NextFunction } from 'express';
        import { AuthenticatedRequest } from './auth';

        export function ensureRole(allowedRoles: string[]) {
          return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
            if (!req.user) {
              return res.status(401).json({ message: 'Autenticação necessária para acessar este recurso.' });
            }

            if (!req.user.role || !allowedRoles.includes(req.user.role)) {
              return res.status(403).json({ message: 'Acesso negado: Você não tem permissão para realizar esta ação.' });
            }

            next();
          };
        }
        