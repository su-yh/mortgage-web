<template>
  <!-- 三级分类组件 -->
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类" style="width: 240px">
        <el-select :disabled="scene==1" v-model="category.firstId" @change="firstCategoryChange">
          <el-option v-for="item in categoryList.firstList" :key="item.id" :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" style="width: 240px">
        <el-select :disabled="scene==1" v-model="category.secondId" @change="secondCategoryChange">
          <el-option v-for="item in categoryList.secondList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" style="width: 240px">
        <el-select :disabled="scene==1" v-model="category.thirdId" @change="thirdCategoryChange">
          <el-option v-for="item in categoryList.thirdList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <div v-show="scene == 0">
      <el-button type="primary" :disabled="category.thirdId == null" :icon="Plus" @click="addAttrDetail">添加平台属性
      </el-button>
      <el-table border :data="attrDetailList">
        <el-table-column label="序号" width="80px" type="index"/>
        <el-table-column label="属性名称" prop="productAttrNameEntity.name" width="180px"/>
        <el-table-column label="属性值列表">
          <template #default="row, $index">
            <el-tag style="margin: 5px" v-for="(item, index) in row.row.productAttrValueEntityList" :key="item.id">
              {{item.value}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="10px">
          <template #default="row, $index">
            <el-button link type="primary" size="small" :icon="Edit"/>
            <el-button link type="primary" size="small" :icon="Delete"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene == 1">
      <el-form :inline="true">
        <el-form-item label="属性名称：">
          <input type="text" v-model="detailDto.productAttrNameEntity.name" placeholder="请输入属性名称">
        </el-form-item>
      </el-form>
      <el-button type="primary" :disabled="!detailDto.productAttrNameEntity.name" :icon="Plus" @click="addAttrValue">
        添加属性值
      </el-button>
      <el-button type="info" @click="cancel">取消</el-button>
      <el-table border :data="detailDto.productAttrValueEntityList">
        <el-table-column label="序号" width="80px" type="index"></el-table-column>
        <el-table-column label="属性值">
          <template #default="scope, $index">
            <input v-model="scope.row.value" placeholder="请输入属性值"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px"></el-table-column>
      </el-table>
      <el-button type="primary" @click="saveDetailDto" :disabled="detailDto.productAttrValueEntityList.length == 0">
        保存
      </el-button>
      <el-button type="info" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>


<script setup lang="ts">
import {Plus, Edit, Delete} from "@element-plus/icons-vue";
import {onMounted, ref, watch} from "vue";
import {
  ProductAttrCategoryEntity,
  ProductAttrNameEntity,
  ProductAttrValueEntity,
  ProductAttrDetailDto
} from "@/api/product/attr/types";
import {queryAttrCategoryList, queryAttrDetailList, createAttrDetail} from '@/api/product/attr';
import {ElMessage} from "element-plus";

interface Category {
  firstId: number | null;
  secondId: number | null;
  thirdId: number | null;
}

interface CategoryList {
  firstList: ProductAttrCategoryEntity[];
  secondList: ProductAttrCategoryEntity[];
  thirdList: ProductAttrCategoryEntity[];
}

// 每一级分类的列表
const categoryList = ref<CategoryList>({
  firstList: [], secondList: [], thirdList: []
})

const scene = ref<number>(0);

// 这个是选择的分类
const category = ref<Category>({
  firstId: null, secondId: null, thirdId: null,
})

const initDetailDto = () => {
  return {
    productAttrNameEntity: {
      categoryId: category.value.thirdId,
      name: '',
      created: null,
      updated: null,
    },
    productAttrValueEntityList: [],
  };
}

// 平台属性的展示列表
let detailDto = ref<ProductAttrDetailDto>(initDetailDto());

// 创建或者更新时的对象
const attrDetailList = ref<ProductAttrDetailDto[]>([]);

onMounted(async () => {
  // 挂载时初始化第一级分类
  const result = await queryAttrCategoryList();
  if (result.code != 0) {
    ElMessage({
      type: "error",
      message: result.message,
    })
    return;
  }

  if (result.data == null) {
    result.data = [];
  }

  categoryList.value.firstList = result.data;
  categoryList.value.secondList = [];
  categoryList.value.thirdList = [];
});

watch(() => category.value.thirdId, () => {
  console.log("thirdId changed.")
  const dto = initDetailDto();

  // TODO: suyh - 这样子并不能清空平台属性table 中的历史数据。在切换一级分类的时候
  detailDto.value.productAttrNameEntity = dto.productAttrNameEntity;
  detailDto.value.productAttrValueEntityList = dto.productAttrValueEntityList;
  detailDto.value = dto;
})

const firstCategoryChange = async (categoryId: number) => {
  // 一级分类选择了某个项之后
  // 1. 通过一级分类ID，去查询得二级分类
  const result = await queryAttrCategoryList(categoryId);
  if (result.code != 0) {
    ElMessage({
      type: "error",
      message: result.message,
    })
    return;
  }
  if (result.data == null) {
    result.data = [];
  }
  categoryList.value.secondList = result.data;
  // 2. 将三级分类的数据清空
  categoryList.value.thirdList = [];
  // 3. 将二级分类的id 以及三级分类的id数据清空
  category.value.secondId = null;
  category.value.thirdId = null;
}

const secondCategoryChange = async (categoryId: number) => {
  // 二级分类选择了某个项之后
  // 1. 通过二级分类ID，去查询得三级分类
  const result = await queryAttrCategoryList(categoryId);
  if (result.code != 0) {
    ElMessage({
      type: "error",
      message: result.message,
    })
    return;
  }
  if (result.data == null) {
    result.data = [];
  }
  categoryList.value.thirdList = result.data;
  // 将三级分类的id 数据清空
  category.value.thirdId = null;
}

const thirdCategoryChange = async (categoryId: number) => {
  // 三级分类选择了某个项之后
  // 1. 通过三级分类ID，去查询得属性明细列表
  const result = await queryAttrDetailList(categoryId);
  console.log("result: ", result);
  if (result.code != 0) {
    ElMessage({
      type: "error",
      message: result.message,
    })
    return;
  }

  if (result.data == null) {
    result.data = []
  }

  attrDetailList.value = result.data;
}

const addAttrDetail = () => {
  scene.value = 1;
  detailDto.value = initDetailDto();
}

const addAttrValue = () => {
  let valueEntity: ProductAttrValueEntity = {value: '', created: null, updated: null};
  detailDto.value.productAttrValueEntityList.push(valueEntity);
}
const cancel = () => {
  scene.value = 0;
}

const saveDetailDto = async () => {
  scene.value = 0;
  const result = await createAttrDetail(detailDto.value);
  if (result.code != 0) {
    ElMessage({
      type: "error",
      message: result.message,
    })
    return;
  }
}

</script>

<script lang="ts">
export default {
  name: 'Attr'
}
</script>

<style scoped>

</style>