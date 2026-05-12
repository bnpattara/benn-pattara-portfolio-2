/**
 * Gap hub is a self-contained static page at `/gap/index.html`.
 * Iframe keeps `/gap` as the canonical URL and works with `output: "export"`.
 */
export default function GapHubPage() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100dvh",
        margin: 0,
        padding: 0,
        zIndex: 0,
        background: "#fff",
      }}
    >
      <iframe
        title="Gap Inc. · Benn Pattara"
        src="/gap/index.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
}
