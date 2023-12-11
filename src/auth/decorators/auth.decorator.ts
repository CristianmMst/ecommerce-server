import { Roles } from './roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from '../guard/roles.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';

export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
