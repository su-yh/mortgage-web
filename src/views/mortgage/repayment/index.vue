<template>

  <el-card>

    <el-card class="search">
      <el-form :inline="true" class="search_form">
        <el-form-item label="用户名：">
          <el-input v-model="nameLike" placeholder="搜索用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="searchPageList">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-button type="primary" @click="addEntity">添加记录</el-button>

    <el-table border style="width: 100%; margin: 10px 0" :data="entitiesPageData.list">
      <el-table-column label="序号" width="80" align="center" type="index"/>
      <el-table-column label="贷款类型">
        <template #default="scope">
          {{ getLoanTypeLabel(scope.row.loanType) }}
        </template>
      </el-table-column>
      <el-table-column label="还款期数" prop="repaymentPeriod"/>
      <el-table-column label="还款日期" prop="actualRepaymentDate"/>
      <el-table-column label="还款本金" prop="actualPrincipal"/>
      <el-table-column label="还款利息" prop="actualInterest"/>
      <el-table-column label="逾期费用" prop="actualOverdueFee"/>
      <el-table-column label="还款总金额" prop="actualTotal"/>
      <el-table-column label="剩余贷款" prop="remainingLoanAmount"/>
      <el-table-column align="center" label="实际LPR(%)" prop="actualLPR"/>
      <el-table-column align="center" label="实际BP(‱)" prop="actualBP"/>
      <el-table-column align="center" label="实际利率(%)">
        <template #default="scope">
          {{ calculateRate(scope.row.actualLPR, scope.row.actualBP) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="实时LPR(%)" prop="realtimeLPR"/>
      <el-table-column align="center" label="实时BP(‱)" prop="realtimeBP"/>
      <el-table-column align="center" label="实时利率(%)">
        <template #default="scope">
          {{ calculateRate(scope.row.realtimeLPR, scope.row.realtimeBP) }}
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark"/>
      <el-table-column align="center" label="创建时间" show-overflow-tooltip>
        <template #default="scope">
          {{ formatDate(scope.row.created) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" show-overflow-tooltip>
        <template #default="scope">
          {{ formatDate(scope.row.updated) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="{row, $index}">
          <el-button type="primary" :icon="Edit" @click="updateEntity(row)"/>
          <el-popconfirm title="确定要删除吗？" @confirm="deleteEntity(row.id)">
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
        :page-sizes="[10, 20, 50, 100]"
        :size="'default'"
        :background="true"
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="entitiesPageData.total"
        @size-change="listPageMortgage"
        @current-change="listPageMortgage"
    />
  </el-card>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ drawerEntityTitle }}</h4>
    </template>
    <template #default>
      <el-form label-width="180px">
        <el-form-item label="贷款类型：">
          <template #default>
            <el-input v-model="drawerEntity.loanType" placeholder="请输入贷款类型"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="还款期数：">
          <template #default>
            <el-input v-model="drawerEntity.repaymentPeriod" placeholder="请输入还款期数"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="还款日期：">
          <template #default>
            <el-input v-model="drawerEntity.actualRepaymentDate" placeholder="请输入还款日期"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="还款本金：">
          <template #default>
            <el-input v-model="drawerEntity.actualPrincipal" placeholder="请输入还款本金"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="还款利息：">
          <template #default>
            <el-input v-model="drawerEntity.actualInterest" placeholder="请输入还款利息"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="逾期费用：">
          <template #default>
            <el-input v-model="drawerEntity.actualOverdueFee" placeholder="请输入逾期费用"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="剩余贷款：">
          <template #default>
            <el-input v-model="drawerEntity.remainingLoanAmount" placeholder="请输入剩余贷款"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="还款方式：">
          <template #default>
            <el-input v-model="drawerEntity.paymentMethod" placeholder="请输入还款方式"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="银行流水号：">
          <template #default>
            <el-input v-model="drawerEntity.paymentNo" placeholder="请输入银行流水号"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="实际贷款利率(%)：">
          <template #default>
            <el-input v-model="drawerEntity.actualLPR" placeholder="请输入实际贷款利率"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="实际基点(‱)：">
          <template #default>
            <el-input v-model="drawerEntity.actualBP" placeholder="请输入实际基点"></el-input>
          </template>
        </el-form-item>
        <!-- TODO: suyh - 为什么没有实时变化 -->
        <el-form-item label="实际利率(‱)：">
          <template #default>
            <span>{{actualRate}}</span>
          </template>
        </el-form-item>
        <el-form-item label="实时贷款利率(%)：">
          <template #default>
            <el-input v-model="drawerEntity.realtimeLPR" placeholder="请输入实时贷款利率"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="实时基点(‱)：">
          <template #default>
            <el-input v-model="drawerEntity.realtimeBP" placeholder="请输入实时基点"></el-input>
          </template>
        </el-form-item>
        <!-- TODO: suyh - 为什么没有实时变化 -->
        <el-form-item label="实时利率(‱)：">
          <template #default>
            <span>{{calculateRate(drawerEntity.realtimeLPR, drawerEntity.realtimeBP)}}</span>
          </template>
        </el-form-item>
        <el-form-item label="备注：">
          <template #default>
            <el-input v-model="drawerEntity.remark"></el-input>
          </template>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelCreate">取消</el-button>
        <el-button type="primary" @click="saveEntity">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>


<script setup lang="ts">

import {Delete, Edit, Plus} from "@element-plus/icons-vue";
import {onMounted, reactive, ref, Ref, computed} from "vue";
import {getLoanTypeLabel, MortgageRepaymentDTO, MortgageRepaymentEntity} from "@/api/mortgage/repayment/types";
import {ListPageParams, ResponseBase} from '@/api/base/types'
import {PageResult} from "@/api/base/types";
import {ElMessage, UploadProps} from "element-plus";
import {
  createMortgageRepayment,
  deleteMortgageRepayment,
  pageListMortgageRepayment,
  updateMortgageRepayment
} from "@/api/mortgage/repayment";
import {calculateRate} from "@/api/base";
import {SysUserEntity} from "@/api/acl/user/types";
import {createUser, updateUser} from "@/api/acl/user";

enum DrawerCategory {
  CREATE,
  UPDATE,
}

let nameLike = ref<string>('');
let drawer = ref<boolean>(false); // 抽屉
const drawerEntityCategory = ref<DrawerCategory>(DrawerCategory.CREATE);
let drawerEntityTitle = ref<string>('');
let drawerEntity = ref<MortgageRepaymentEntity>({});

let pageParam = reactive<ListPageParams>({
  pageNo: 1, pageSize: 10
});

let entitiesPageData: PageResult<MortgageRepaymentEntity> = reactive<PageResult<MortgageRepaymentEntity>>({total: 0, list: []})

onMounted(() => {
  listPageMortgage();
});

const actualRate = computed(() => {
  let actualLPR: number = drawerEntity.value.actualLPR ? drawerEntity.value.actualLPR : 0;
  let actualBP: number = drawerEntity.value.actualBP ? drawerEntity.value.actualBP : 0;
  return calculateRate(actualLPR, actualBP);
});

const realtimeRate = computed(() => {
  let realtimeLPR: number = drawerEntity.value.realtimeLPR ? drawerEntity.value.realtimeLPR : 0;
  let realtimeBP: number = drawerEntity.value.realtimeBP ? drawerEntity.value.realtimeBP : 0;
  return calculateRate(realtimeLPR, realtimeBP);
});

const listPageMortgage = async () => {
  const response: ResponseBase<PageResult<MortgageRepaymentEntity>> = await pageListMortgageRepayment(pageParam);
  console.log(`response: ${response}`)
  if (response.code == 0) {
    const pr: PageResult<MortgageRepaymentEntity> = response.data;
    entitiesPageData.total = pr.total;
    entitiesPageData.list = pr.list;
  } else {
    console.log(`response.code = ${response.code}`)
  }
}

const deleteEntity = async (id: number) => {
  await deleteMortgageRepayment(id);
  await listPageMortgage();
}

const searchPageList = async () => {
  await listPageMortgage();
}

const formatDate = (date: Date | string | number) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  const second = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

const addEntity = () => {
  drawer.value = true;
  drawerEntityCategory.value = DrawerCategory.CREATE;
  drawerEntityTitle.value = '添加';

  drawerEntity.value = {}
}
const updateEntity = (entity: MortgageRepaymentEntity) => {
  drawer.value = true;
  drawerEntityCategory.value = DrawerCategory.UPDATE;
  drawerEntityTitle.value = '编辑';

  drawerEntity.value = {...entity};
}
const cancelCreate = () => {
  drawer.value = false;
}
const saveEntity = async () => {

  let result: ResponseBase<number> | null = null;
  let messagePrev = '';
  switch (drawerEntityCategory.value) {
    case DrawerCategory.CREATE:
      result = await createMortgageRepayment(drawerEntity.value);
      messagePrev = '添加';
      break
    case DrawerCategory.UPDATE:
      console.log("drawerEntity: ", drawerEntity.value)
      result = await updateMortgageRepayment(drawerEntity.value);
      messagePrev = '更新';
      break
    default:
      break;
  }
  if (result == null) {
    ElMessage({
      type: "error",
      message: 'result is null',
    })
    return;
  }
  if (result.code != 0) {
    ElMessage({
      type: "error",
      message: result.message,
    })
    return;
  }

  ElMessage({
    type: "success",
    message: messagePrev + '成功',
  })

  await listPageMortgage();

  drawer.value = false;
}
</script>


<style scoped lang="scss">
.search {
  margin-bottom: 10px;
}
</style>