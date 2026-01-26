
import { BaseAdminPanelPropsType, BaseEditModalPropsType, BaseTablePropsType } from "./AdminPanelTypes";
import { FileType } from "./FileType";

export type FileAdminPanelPropsType = BaseAdminPanelPropsType<FileType>

export type EditFileModalPropsType = BaseEditModalPropsType<FileType>

export type FileTablePropsType = BaseTablePropsType<FileType>
