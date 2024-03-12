import $ from "jquery";
export function Summernote() {
  $(function () {
    //  function init_summernote(): any;
    // Summernote
    $("#summernote").summernote({
      height: 250,
    });
    var CodeMirror;
    // CodeMirror
    CodeMirror.fromTextArea(document.getElementById("codeMirrorDemo"), {
      mode: "htmlmixed",
      theme: "monokai",
    });
  });
}
