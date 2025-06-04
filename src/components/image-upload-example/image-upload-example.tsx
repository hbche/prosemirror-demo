function ImageUploadExample() {
  return (
    <div>
      <div id='editor'>
        <div id='content'></div>
      </div>
      上传图片：
      <input
        type='file'
        id='file-input'
        onChange={(e) => {
          if (e.target.files?.length) {
            console.log(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}

export default ImageUploadExample;
