import { uploadFile } from '@/api/common.ts'

import useFetch from '@/hooks/useFetch'

export default function (props, key) {
  /** 文件上传 */
  const { executeFetch: executeUpload } = useFetch(uploadFile, { name: '上传' })

  /**
   * 自定义文件上传
   */
  async function customUploadFile(file) {
    console.log('file', file)

    // 参数
    const formData = new FormData()
    formData.append('file', file)

    const res = await executeUpload(formData)
    if (res.success) {
      const { name, url } = res.data

      return {
        url,
        alt: name,
        href: url,
        poster: '',
      }
    } else {
      return {}
    }
  }

  /**
   * 图片配置
   */
  const uploadImage = {
    /** 自定义上传 */
    async customUpload(file, insertFn) {
      const { url, alt, href } = await customUploadFile(file)
      if (url) {
        insertFn(url, alt, href)
      }
    },
  }

  /**
   * 视频配置
   */
  const uploadVideo = {
    async customUpload(file, insertFn) {
      const { url, poster } = await customUploadFile(file)
      if (url) {
        insertFn(url, poster)
      }
    },
  }

  /**
   * 最终配置
   */
  const editorConfig = computed(() => {
    return {
      MENU_CONF: {
        uploadImage,
        uploadVideo,
      },
      ...props[key],
    }
  })

  return editorConfig
}
