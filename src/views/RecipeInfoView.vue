<template>
  <n-space vertical size="large" style="padding: 20px; max-width: 600px; margin: auto;">
    <!-- 菜谱名字 -->
    <n-form-item label="菜谱名字">
      <n-input v-model:value="recipe.cp_name" placeholder="请输入菜谱名字" />
    </n-form-item>
    <n-form-item label="菜谱封面">
      <n-input v-model:value="recipe.cover" disabled placeholder="请输入封面地址" />
    </n-form-item>
    <n-image width="100" :src="recipe.cover">
      <template #error>
        <n-icon :size="100">
          <HideImageOutlined />
        </n-icon>
      </template>
    </n-image>

    <n-form-item label="菜谱难度">
      <n-input v-model:value="recipe.cook_level" placeholder="请输入菜谱难度" />
    </n-form-item>
    <n-form-item label="烹饪时长">
      <n-input v-model:value="recipe.cook_time" placeholder="请输入烹饪时长" />
    </n-form-item>

    <!-- 标签编辑 -->
    <n-form-item label="标签">
      <n-space>
        <n-input
          v-model:value="tagInput"
          placeholder="输入标签后回车"
          @keyup.enter="addTag"
          style="width: 200px"
        />
        <n-space>
          <n-tag
            v-for="(tag, index) in recipe.tags"
            :key="index"
            closable
            @close="removeTag(index)"
          >
            {{ tag }}
          </n-tag>
        </n-space>
      </n-space>
    </n-form-item>

    <!-- 做菜步骤 -->
    <n-form-item label="做菜步骤">
      <n-space vertical>
        <div
          v-for="(step, index) in recipe.steps"
          :key="index"
          style="display: flex; align-items: center; gap: 8px;"
        >
          <n-input
            v-model="recipe.steps[index]"
            type="textarea"
            placeholder="输入步骤内容"
            autosize
          />
          <n-button type="error" secondary size="small" @click="removeStep(index)">
            删除
          </n-button>
        </div>
        <n-button type="primary" ghost @click="addStep">
          添加步骤
        </n-button>
      </n-space>
    </n-form-item>

    <!-- 保存按钮 -->
    <n-form-item>
      <n-button type="success" @click="saveRecipe">保存菜谱</n-button>
    </n-form-item>
  </n-space>
</template>

<script>
import { useRoute } from 'vue-router'
import {HideImageOutlined} from '@vicons/material'
import request from '@/utils/request.js'

export default {
  components:{
    HideImageOutlined,
  },
  data() {
    return {
      route:useRoute(),
      recipe: {},
      aiImgs:[],
      tagInput: "",
    };
  },
  mounted() {
  this.fetchData()
  },
  methods: {
    fetchData(){
      request.get("http://127.0.0.1:8080/api/recipe/info", {
        params: {
         id:this.route.query.id,
        },
      }).then(res => {
        console.log(res);
        if (res.errno === 0) {
          this.recipe = res.data.info
          this.recipe.cover = "https://cos1-1252031674.cos.ap-beijing.myqcloud.com/"+this.recipe.cover
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {

        }
      );
    },
    generateCoverImg(title,ingredients,process){
      request.post("/ai_img/generate", {
        name:title,
        ingredients:ingredients,
        process:process
      },
        {
          headers: {
            'Content-Type': 'application/json' // 或者 application/x-www-form-urlencoded
          }
        }
      ).then(res => {
        console.log(res);
        this.aiImgs = res.images_base64s
      }).catch(error => {
        console.log(error);
      }).finally(() => {

        }
      );
    },



    addTag() {
      if (this.tagInput.trim() && !this.recipe.tags.includes(this.tagInput.trim())) {
        this.recipe.tags.push(this.tagInput.trim());
      }
      this.tagInput = "";
    },
    removeTag(index) {
      this.recipe.tags.splice(index, 1);
    },
    addStep() {
      this.recipe.steps.push("");
    },
    removeStep(index) {
      this.recipe.steps.splice(index, 1);
    },
    saveRecipe() {
      console.log("保存的菜谱：", this.recipe);
      this.$message.success("菜谱已保存（控制台查看数据）");
    },
  },
};
</script>

<style scoped>
.n-form-item {
  width: 100%;
}
</style>