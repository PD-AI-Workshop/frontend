import { BaseAdminPanelPropsType, BaseEditModalPropsType, BaseTablePropsType } from "./AdminPanelTypes";
import { CategoryType } from "./CategoryTypes";

export type CategoryAdminPanelPropsType = BaseAdminPanelPropsType<CategoryType>

export type EditCategoryModalPropsType = BaseEditModalPropsType<CategoryType>

export type CategoryTablePropsType = BaseTablePropsType<CategoryType>
