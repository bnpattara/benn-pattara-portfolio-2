/**
 * Encore Cup strategic audit is a self-contained static page at `/encore-cup/audit-memo.html`.
 * Iframe keeps `/encore-cup/strategic-audit` as the canonical URL and works with `output: "export"`.
 */
export default function EncoreCupStrategicAuditPage() {
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
        background: "#F2EBDD",
      }}
    >
      <iframe
        title="Encore Cup '26 — Strategic District Audit"
        src="/encore-cup/audit-memo.html"
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
