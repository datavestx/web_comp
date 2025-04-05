        let comments = [];
        // Function to apply bold styling
        function applyBold() {
            document.execCommand('bold', false, null);
        }
        // Function to apply italic styling
        function applyItalic() {
            document.execCommand('italic', false, null);
        }
        // Function to apply underline styling
        function applyUnderline() {
            document.execCommand('underline', false, null);
        }
        // Function to apply strike-through styling
        function applyStrikeThrough() {
            document.execCommand('strikeThrough', false, null);
        }
        // Function to insert a link
        function applyLink() {
            const url = prompt("Masukkan URL:");
            if (url) {
                document.execCommand('createLink', false, url);
            }
         }
        // Function to insert emoticons
        function insertEmoticon(emoticon) {
            document.execCommand('insertText', false, emoticon);
        }
        // Function to change font family
        function changeFontFamily(select) {
            document.execCommand('fontName', false, select.value);
        }
        // Function to change font size
        function changeFontSize(select) {
            document.execCommand('fontSize', false, select.value);
        }
        // Function to change text color
        function changeTextColor(input) {
            document.execCommand('foreColor', false, input.value);
        }
        // Function to apply bullet list
        function applyBulletList() {
            document.execCommand('insertUnorderedList', false, null);
        }
        // Function to apply numbered list
        function applyNumberedList() {
            document.execCommand('insertOrderedList', false, null);
        }
        // Function to increase indent (create nested list)
        function increaseIndent() {
            document.execCommand('indent', false, null);
        }
        // Function to decrease indent (reduce nested list)
        function decreaseIndent() {
            document.execCommand('outdent', false, null);
        }
        // Function to apply left alignment
        function applyLeftAlign() {
            document.execCommand('justifyLeft', false, null);
        }
        // Function to apply center alignment
        function applyCenterAlign() {
            document.execCommand('justifyCenter', false, null);
        }
        // Function to apply right alignment
        function applyRightAlign() {
            document.execCommand('justifyRight', false, null);
        }
        // Function to copy selected text
        function copyText() {
            document.execCommand('copy', false, null);
        }
        // Function to cut selected text
        function cutText() {
            document.execCommand('cut', false, null);
        }
        // Function to paste text at the cursor position
        function pasteText() {
            document.execCommand('paste', false, null);
        }
        // Handle file upload
        function handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const fileType = file.type.split("/")[0];
                    const fileName = file.name;
                    const fileData = e.target.result;

                    // If the file is an image, display it
                    if (fileType === "image") {
                        const img = document.createElement("img");
                        img.src = fileData;
                        img.style.maxWidth = "100%";
                        img.classList.add("attachment");
                        document.getElementById("commentArea").appendChild(img);
                    } else {
                        const fileLink = document.createElement("a");
                        fileLink.href = fileData;
                        fileLink.download = fileName;
                        fileLink.textContent = `Lampiran: ${fileName}`;
                        fileLink.classList.add("attachment");
                        document.getElementById("commentArea").appendChild(fileLink);
                    }
                };
                reader.readAsDataURL(file);
               }
            }

            // Function to submit and display the comment
            function submitComment() {
            const commentContent = document.getElementById("commentArea").innerHTML;
            const commentSection = document.getElementById("commentSection");

            // Create a new comment element
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");

            // Insert the comment content into the new element
            commentElement.innerHTML = `
                <div class="username">Pengguna:</div>
                <div class="content">${commentContent}</div>
            `;

            // Append the comment to the comment section
            commentSection.appendChild(commentElement);

            // Add the comment to the comments array
            comments.push(commentContent);

            // Clear the comment area
            document.getElementById("commentArea").innerHTML = '';
           }

        // Function to save comments to a .txt file
           function saveComments() {
            if (comments.length === 0) {
                alert("Tidak ada komentar untuk disimpan.");
                return;
            }

            let commentsText = "Komentar:\n\n";
            comments.forEach((comment, index) => {
                commentsText += `Komentar ${index + 1}:\n${comment}\n\n`;
            });
            // Blob
            const blob = new Blob([commentsText], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "komentar.txt";
            link.click();
            }