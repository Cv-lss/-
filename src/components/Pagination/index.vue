<template>
    <div class="pagination">
        <button :disabled="pageNoe == 1" @click="$emit('getPageNo', pageNoe - 1)">上一页</button>
        <button v-if="starNumAndEndNum.star > 1" @click="$emit('getPageNo', 1)"
            :class="{ active: pageNoe == 1 }">1</button>
        <button v-if="starNumAndEndNum.star > 2">···</button>


        <button v-for="(page, index) in starNumAndEndNum.end" :key="index" v-if="page >= starNumAndEndNum.star"
            @click="$emit('getPageNo', page)" :class="{ active: pageNoe == page }">{{
                    page
            }}</button>


        <button v-if="starNumAndEndNum.end < totalPage - 1">···</button>
        <button v-if="starNumAndEndNum.end < totalPage" :class="{ active: pageNoe == totalPage }">{{ totalPage
        }}</button>
        <button :disabled="pageNoe == totalPage" @click="$emit('getPageNo', pageNoe + 1)">下一页</button>

        <button style="margin-left: 30px">共{{ total }}条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ['pageNoe', 'pageSize', 'total', 'continues'],

    computed: {
        totalPage() {
            //向上取整 判断当前有多少页
            return Math.ceil(this.total / this.pageSize)
        },
        starNumAndEndNum() {
            //结构传过来的数据
            const { pageNoe, totalPage, continues } = this
            //先声明两个变量 保存初始和结束
            let star = 0,
                end = 0;
            //连续页码必须是5页 如果没有5页就会变得不正常
            //判断总页数是不是没有连续页码多
            if (continues > totalPage) {
                //如果没有大于5页 初始数就等于1 结束就等于总页数
                star = 1
                end = totalPage
            } else {
                //如果总页数大于页码数 起始数就是 当前所在的页码 减去 页码数 除2  因为有可能页码数是7 不是5 所以要写动态的 不能直接减2
                star = pageNoe - parseInt(continues / 2)
                end = pageNoe + parseInt(continues / 2)

                //不正常现象 起始值会出现负数 
                if (star < 1) {
                    //如果star小于1了 就等于1 不能出现负数
                    star = 1
                    //结束页数 等于页码数就行了
                    end = continues
                }
                //不正常现象 结束值会大一总页数 
                if (end > totalPage) {
                    //如果大于总页数 就等于总页数
                    end = totalPage
                    //起始数就等于 总页数 减去 页码数 加 1
                    satr = totalPage - continues + 1
                }
            }
            return { star, end }
        },

    }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>