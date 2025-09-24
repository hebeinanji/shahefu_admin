<template>
  <n-card>
    <n-space vertical size="large" style="padding: 20px; max-width: 800px; margin: auto;">
      <!-- 菜谱名字 -->
      <n-form-item label="菜谱名字">
        <n-input v-model:value="recipe.cp_name" placeholder="请输入菜谱名字" />
      </n-form-item>
      <n-form-item label="菜谱封面">
        <n-input v-model:value="recipe.cover" disabled/>
      </n-form-item>
      <n-image width="100" :src="recipe.cover">
        <template #error>
          <n-icon :size="100">
            <HideImageOutlined />
          </n-icon>
        </template>
      </n-image>
      <n-upload
        :max="1"
        list-type="image"
        :custom-request="customRequest"
        :previewed-img-props="{ style: { border: '8px solid white' } }"
      >
      <n-button>替换封面</n-button>
      </n-upload>
      <n-form-item label="菜谱难度">
        <n-select v-model:value="recipe.cook_level" :options="options" />
      </n-form-item>
      <n-form-item label="烹饪时长">
        <n-select v-model:value="recipe.cook_time" :options="time_options" />
      </n-form-item>
      <n-form-item label="配料">
        <n-input type="textarea" v-model:value="recipe.origin" disabled/>
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
            v-for="(step, index) in recipe.step"
            :key="index"
            class="w-96 flex items-center justify-center"
          >
            <n-input
              v-model:value="recipe.step[index]"
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
  </n-card>
</template>

<script>
import { useRoute } from 'vue-router'
import {useMessage} from "naive-ui";
import {HideImageOutlined} from '@vicons/material'
import request from '@/utils/request.js'

export default {
  components:{
    HideImageOutlined,
  },
  data() {
    return {
      route:useRoute(),
      message:useMessage(),
      recipe: {},
      aiImgs:[],
      tagInput: "",
      options:[
        {
          label: "简单",
          value: 0,
        },
        {
          label: "中等",
          value: 1
        },
        {
          label: "复杂",
          value: 2
        },
      ],
      time_options:[
        {
          label: "10分钟左右",
          value: 0,
        },
        {
          label: "15分钟左右",
          value: 1
        },
        {
          label: "30分钟左右",
          value: 2
        },
        {
          label: "45分钟左右",
          value: 3
        },
        {
          label: "60分钟左右",
          value: 4
        },
        {
          label: "80分钟左右",
          value: 5
        },
        {
          label: "90分钟左右",
          value: 6
        },
        {
          label: "100分钟左右",
          value: 7
        },
        {
          label: "120分钟左右",
          value: 8
        },
        {
          label: "150分钟左右",
          value: 9
        },{
          label: "180分钟左右",
          value: 10
        },
        {
          label: "240分钟左右",
          value: 11
        },

      ],
    };
  },
  mounted() {
  this.fetchData()
  },
  methods: {
    customRequest({file}){
      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("recipe_id", this.recipe.id);
      request.post("/admin/recipe/modify_cover", formData).then((res) => {
        console.log(res.data.url)
        if (res.errno === 0) {
          this.recipe.cover = "https://cos1-1252031674.cos.ap-beijing.myqcloud.com/"+res.data.url
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    fetchData(){
      request.get("/admin/recipe/info", {
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
      this.recipe.step.push("");
    },
    removeStep(index) {
      this.recipe.step.splice(index, 1);
    },
    saveRecipe() {
      console.log("保存的菜谱：", this.recipe);
      request.post("/admin/recipe/edit",this.recipe).then(res => {
        console.log(res);
        if (res.errno === 0) {
          this.message.success("菜谱已保存（控制台查看数据）");
        }else{
          this.message.error("菜谱保存失败");
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {

        }
      );

    },
  },
};
</script>

<style scoped>
</style>