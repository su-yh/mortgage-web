export interface ProductAttrCategoryEntity {
  id?: number,
  parentId?: number,
  name: string,
  created: Date,
  updated: Date,
}

export interface ProductAttrNameEntity {
  id?: number,
  categoryId: number | null,
  name: string,
  created: Date | null,
  updated: Date | null,
}

export interface ProductAttrValueEntity {
  id?: number,
  attrNameId?: number,
  value: string,
  created: Date | null,
  updated: Date | null,
}

export interface ProductAttrDetailDto {
  productAttrNameEntity: ProductAttrNameEntity;
  productAttrValueEntityList: ProductAttrValueEntity[];
}