import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
export function tokenGetter() {
    return localStorage.getItem('id_token');
}

const tokenConfiguration: JwtModuleOptions = {
    config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8083']
    }
  };

export {tokenConfiguration};

