async function analyzeAudio() {
  const fileInput = document.getElementById('audioInput');
  const output = document.getElementById('output');
  const loading = document.getElementById('loading');

  if (!fileInput.files[0]) {
    alert("يرجى اختيار ملف صوتي");
    return;
  }

  output.innerText = "";
  loading.classList.remove("hidden");

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  formData.append("model", "whisper-1"); // Whisper model

  try {
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: "Bearer YOUR_API_KEY" // ← ضع مفتاح OpenAI هنا
      },
      body: formData
    });

    const data = await response.json();
    loading.classList.add("hidden");

    if (data.text) {
      output.innerText = "النص المستخرج:\n\n" + data.text;
    } else {
      output.innerText = "حدث خطأ في المعالجة.";
    }
  } catch (err) {
    loading.classList.add("hidden");
    output.innerText = "⚠️ فشل الاتصال بالخادم.";
    console.error(err);
  }
}
