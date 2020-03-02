<template>
  <el-table
    :data="list"
    style="width: 100%;padding-top: 15px;"
  >
    <el-table-column
      label="Total"
      align="center"
    >
      <template slot-scope="{row}">
        {{ row.orderId }}명
      </template>
    </el-table-column>
    <el-table-column
      label="Avr"
      align="center"
    >
      <template slot-scope="{row}">
        {{ row.price }}분
      </template>
    </el-table-column>
    <el-table-column
      label="Max"
      align="center"
    >
      <template slot-scope="{row}">
          {{ row.status }}분
      </template>
    </el-table-column>
    <el-table-column
      label="min"
      align="center"
    >
      <template slot-scope="{row}">
          {{ row.status }}분
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getTransactions } from '@/api/transactions'
import { ITransactionData } from '@/api/types'

@Component({
  name: 'TransactionTable',
  filters: {
    transactionStatusFilter: (status: string) => {
      const statusMap: { [key: string]: string } = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter: (str: string) => str.substring(0, 30),
    // Input 10000 => Output "10,000"
    toThousandFilter: (num: number) => {
      return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    }
  }
})
export default class extends Vue {
  private list: ITransactionData[] = []

  created() {
    this.fetchData()
  }

  private async fetchData() {
    const { data } = await getTransactions({ /* Your params here */ })
    this.list = data.items.slice(0, 1)
  }
}
</script>
