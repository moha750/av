const avatarUpload = document.getElementById('avatar-upload');
const cropperContainer = document.getElementById('cropper-container');
const avatarImg = document.getElementById('avatar');
const frameImg = document.getElementById('frame');
const downloadBtn = document.getElementById('download-btn');

let cropper;

// عند تحميل صورة الأفتار
avatarUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // إظهار الصورة في Cropper.js
            if (cropper) {
                cropper.destroy(); // إعادة تعيين Cropper إذا كان موجودًا
            }
            avatarImg.src = e.target.result;
            avatarImg.style.display = 'block';
            cropperContainer.innerHTML = '<img id="cropper-img" src="' + e.target.result + '">';
            const cropperImg = document.getElementById('cropper-img');
            cropper = new Cropper(cropperImg, {
                aspectRatio: 1, // نسبة القص 1:1 (مربع)
                viewMode: 1,
                autoCropArea: 1, // تغطية أكبر مساحة ممكنة
                guides: false,
                background: false, // إزالة الخلفية السوداء
                ready() {
                    downloadBtn.disabled = false; // تفعيل زر الحفظ
                    // جعل منطقة القص بنفس حجم الحاوية
                    const cropBox = cropper.getCropBoxData();
                    cropBox.width = 400; // عرض منطقة القص (يجب أن يتطابق مع عرض .cropper-container)
                    cropBox.height = 400; // ارتفاع منطقة القص (يجب أن يتطابق مع ارتفاع .cropper-container)
                    cropper.setCropBoxData(cropBox);
                },
                crop(event) {
                    // تحديث الصورة في #avatar عند التعديل
                    const canvas = cropper.getCroppedCanvas({
                        width: 300, // عرض الصورة المعروضة (يجب أن يتطابق مع عرض #avatar-container)
                        height: 300, // ارتفاع الصورة المعروضة (يجب أن يتطابق مع ارتفاع #avatar-container)
                        fillColor: '#fff', // لون الخلفية إذا كانت الصورة غير مربعة
                    });
                    avatarImg.src = canvas.toDataURL('image/png');
                }
            });
        };
        reader.readAsDataURL(file);
    }
});

// عند النقر على زر الحفظ
downloadBtn.addEventListener('click', function() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // تعيين أبعاد الكانفاس إلى 1080x1080 بكسل
    canvas.width = 1080;
    canvas.height = 1080;

    // قص الصورة باستخدام Cropper.js
    const croppedCanvas = cropper.getCroppedCanvas({
        width: 1080,
        height: 1080,
        fillColor: '#fff', // لون الخلفية إذا كانت الصورة غير مربعة
    });

    // رسم الصورة بشكل دائري
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
    context.closePath();
    context.clip(); // اقتصاص الصورة بشكل دائري

    // رسم الصورة المقطوعة على الكانفاس
    context.drawImage(croppedCanvas, 0, 0, canvas.width, canvas.height);

    // رسم صورة الإطار بحجم 1080x1080
    const frame = new Image();
    frame.src = frameImg.src;
    frame.onload = function() {
        context.drawImage(frame, 0, 0, canvas.width, canvas.height);

        // تحويل الكانفاس إلى صورة
        const dataURL = canvas.toDataURL('image/png');

        // إنشاء رابط للتحميل
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'avatar-circular-1080x1080.png'; // اسم الملف
        link.click();
    };
});

// عند النقر على زر الحفظ
downloadBtn.addEventListener('click', function() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // تعيين أبعاد الكانفاس إلى 1080x1080 بكسل
    canvas.width = 1080;
    canvas.height = 1080;

    // قص الصورة باستخدام Cropper.js
    const croppedCanvas = cropper.getCroppedCanvas({
        width: 1080,
        height: 1080,
        fillColor: '#fff', // لون الخلفية إذا كانت الصورة غير مربعة
    });

    // رسم الصورة بشكل دائري
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
    context.closePath();
    context.clip(); // اقتصاص الصورة بشكل دائري

    // رسم الصورة المقطوعة على الكانفاس
    context.drawImage(croppedCanvas, 0, 0, canvas.width, canvas.height);

    // رسم صورة الإطار بحجم 1080x1080
    const frame = new Image();
    frame.src = frameImg.src;
    frame.onload = function() {
        context.drawImage(frame, 0, 0, canvas.width, canvas.height);

        // تحويل الكانفاس إلى صورة
        const dataURL = canvas.toDataURL('image/png');

        // إنشاء رابط للتحميل
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'avatar-circular-1080x1080.png'; // اسم الملف
        link.click();

        // عرض روابط المشاركة
        const shareButtons = document.getElementById('share-buttons');
        shareButtons.style.display = 'block';

        // إنشاء روابط المشاركة
        const imageUrl = encodeURIComponent(dataURL); // ترميز رابط الصورة
        const text = encodeURIComponent('انظر إلى الأفتار الرائع الذي قمت بإنشائه!'); // نص المشاركة

        // رابط مشاركة Facebook
        document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`;

        // رابط مشاركة Twitter
        document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?url=${imageUrl}&text=${text}`;

        // رابط مشاركة WhatsApp
        document.getElementById('share-whatsapp').href = `https://api.whatsapp.com/send?text=${text} ${imageUrl}`;
    };
});