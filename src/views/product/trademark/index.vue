<template>
  <el-card>
    <el-button type="primary" :icon="Plus" @click="createTrademark">添加品牌</el-button>

    <el-table border style="width: 100%; margin: 10px 0" :data="trademarkPageData.list">
      <el-table-column label="序号" width="80" align="center" type="index"/>
      <el-table-column label="品牌名称" prop="name"/>
      <el-table-column label="品牌LOGO">
        <template #default="{row, $index}">
          <img :src="row.logo" alt="展示图片" style="height:40px;">
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template #default="{row, $index}">
          <span>{{ formatTimestamp(row.created) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template #default="{row, $index}">
          <span>{{ formatTimestamp(row.updated) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" prop="name">
        <template #default="{row, $index}">
          <el-button type="primary" :icon="Edit" @click="updateTrademark(row)"/>
          <el-popconfirm title="确定要删除吗？" @confirm="deleteTrademark(row.id)">
            <template #reference>
              <el-button type="primary" :icon="Delete" color="red"/>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:current-page="pageParam.pageNo"
        v-model:page-size="pageParam.pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :size="'default'"
        :background="true"
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="trademarkPageData.total"
        @size-change="listPageTrademark"
        @current-change="listPageTrademark"
    />
  </el-card>

  <!-- 创建、更新对话框 -->
  <el-dialog v-model="dialogForm.visible" :title="dialogForm.title" width="500">
    <el-form :model="dialogForm.data">
      <el-form-item label="id" :label-width="dialogForm.labelWidth">
        <el-input-number :controls="false" v-model="dialogForm.data.id"></el-input-number>
      </el-form-item>
      <el-form-item label="品牌名称" :label-width="dialogForm.labelWidth">
        <el-input v-model="dialogForm.data.name" placeholder="请输入品牌名称" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="品牌LOGO" :label-width="dialogForm.labelWidth">
        <el-upload class="avatar-uploader" :action="ignore"
                   :on-success="handleUploadSuccess"
                   :http-request="uploadFile"
                   :show-file-list="false">
          <img v-if="dialogForm.data.logo" :src="dialogForm.data.logo" class="avatar" alt="#"/>
          <el-icon v-else class="avatar-uploader-icon"><UploadFilled/></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormCancel">取消</el-button>
        <el-button type="primary" @click="dialogFormConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>


<script setup lang="ts">
import {Delete, Edit, Plus, UploadFilled} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import {
  listPage,
  createTrademark as createTrademarkReq,
  updateTrademark as updateTrademarkReq,
  deleteTrademark as deleteTrademarkReq,
} from "@/api/product/trademark";
import {upload} from '@/api/file';
import {ListPageParams, ResponseBase} from '@/api/base/types'
import {TrademarkEntity} from "@/api/product/trademark/types";
import {PageResult} from "@/api/base/types";
import {ElMessage, UploadProps} from "element-plus";

enum DialogCategory {
  CREATE,
  UPDATE,
}

interface DialogForm {
  visible: boolean;
  labelWidth: string;
  title: string;
  category: DialogCategory;
  data: TrademarkEntity;
}

let pageParam = reactive<ListPageParams>({
  pageNo: 1, pageSize: 3
});

let trademarkPageData: PageResult<TrademarkEntity>
    = reactive<PageResult<TrademarkEntity>>({total: 0, list: []})

const initTrademark = (id: number | null = null): TrademarkEntity => {
  return {
    id: id,
    name: '',
    logo: '',
    created: new Date(),
    updated: new Date(),
  }
}

let dialogForm = reactive<DialogForm>({
  visible: false,
  labelWidth: '80px',
  title: '',
  category: DialogCategory.CREATE,
  data: initTrademark(),
})

const listPageTrademark = async () => {
  const response: ResponseBase<PageResult<TrademarkEntity>> = await listPage(pageParam);
  if (response.code == 0) {
    const tradeMarkPageResult: PageResult<TrademarkEntity> = response.data;
    trademarkPageData.total = tradeMarkPageResult.total;
    trademarkPageData.list = tradeMarkPageResult.list;
  }
}

onMounted(() => {
  listPageTrademark();
});

// 添加品牌按钮
const createTrademark = () => {
  dialogForm.visible = true;
  dialogForm.category = DialogCategory.CREATE;
  dialogForm.title = '创建品牌'
  dialogForm.data = initTrademark();
}

// 更新品牌按钮
const updateTrademark = (trademark: TrademarkEntity) => {
  dialogForm.visible = true;
  dialogForm.category = DialogCategory.UPDATE;
  dialogForm.title = '更新品牌';
  // 不能将原对象直接引用，不然用户修改了，然后取消之后原来数据将会被污染。
  dialogForm.data = {...trademark};
}

// 删除按钮
const deleteTrademark = async (id: number) => {
  await deleteTrademarkReq(id);
  // 更新成功之后，要刷新 页面
  await listPageTrademark();
}

// 时间戳的格式化
const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 添加与更新对话框取消
const dialogFormCancel = () => {
  // 隐藏对话框
  dialogForm.visible = false;
}

// 添加与更新对话框确定
const dialogFormConfirm = async () => {
  // 隐藏对话框
  dialogForm.visible = false;

  let response: ResponseBase;
  if (dialogForm.category == DialogCategory.CREATE) {
    response = await createTrademarkReq(dialogForm.data);
  } else if (dialogForm.category == DialogCategory.UPDATE) {
    response = await updateTrademarkReq(dialogForm.data);
  } else {
    throw new Error('Unsupported dialog category');
  }

  if (response.code != 0) {
    ElMessage({
      type: "error",
      message: response.message,
    })

    return;
  }

  // 更新成功之后，要刷新 页面
  await listPageTrademark();
}

// 文件上传成功的回调
const handleUploadSuccess:UploadProps['onSuccess'] = (rspData, uploadFile) => {
  console.log("onSuccess: ", rspData);
  dialogForm.data.logo = rspData;
}

// 文件上传
const uploadFile = (params) => {
  const formData = new FormData();
  formData.append('file', params.file);
  upload(formData).then(rsp => {
    params.onSuccess(rsp.data, params.file, [params.file]);
  }).catch(error => {
    params.onError(error);
  });
};

</script>


<script lang="ts">
export default {
  name: 'Trademark'
}
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: contain;
}

</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
