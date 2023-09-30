import { createEntityAdapter } from '@ngrx/entity'
import {UserModel, Users} from './model/User.model'

export const UserAdapter = createEntityAdapter<Users>();

export const userState:UserModel = UserAdapter.getInitialState();
