import { BaseAdminPanelPropsType, BaseEditModalPropsType, BaseTablePropsType } from "./AdminPanelTypes";
import { UserType } from "./UserTypes";

export type UserAdminPanelPropsType = BaseAdminPanelPropsType<UserType>

export type UserEditModalPropsType = BaseEditModalPropsType<UserType>

export type UserTablePropsType = BaseTablePropsType<UserType>
