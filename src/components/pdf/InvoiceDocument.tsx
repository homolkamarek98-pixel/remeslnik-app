import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { InvoiceData } from "@/lib/invoice";
import { formatCzk } from "@/lib/utils";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9vAw.ttf", fontWeight: 700 },
  ],
});

const s = StyleSheet.create({
  page: { fontFamily: "Roboto", fontSize: 9, padding: 40, color: "#1a1a1a" },
  row: { flexDirection: "row" },
  col: { flex: 1 },
  h1: { fontSize: 22, fontWeight: 700, marginBottom: 4 },
  h2: { fontSize: 11, fontWeight: 700, marginBottom: 6 },
  label: { color: "#666", marginBottom: 2 },
  value: { marginBottom: 2 },
  bold: { fontWeight: 700 },
  divider: { borderBottomWidth: 1, borderColor: "#e5e5e5", marginVertical: 12 },
  table: { marginTop: 8 },
  tableHeader: { flexDirection: "row", backgroundColor: "#f5f5f5", padding: "4 6", fontWeight: 700 },
  tableRow: { flexDirection: "row", padding: "4 6", borderBottomWidth: 1, borderColor: "#f0f0f0" },
  desc: { flex: 3 },
  num: { flex: 1, textAlign: "right" },
  summaryRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 4 },
  summaryLabel: { width: 120, color: "#666" },
  summaryValue: { width: 80, textAlign: "right" },
  total: { fontWeight: 700, fontSize: 11 },
  vatTable: { marginTop: 12 },
  vatHeader: { flexDirection: "row", backgroundColor: "#f5f5f5", padding: "3 6", fontWeight: 700 },
  vatRow: { flexDirection: "row", padding: "3 6", borderBottomWidth: 1, borderColor: "#f0f0f0" },
  vatCol: { flex: 1, textAlign: "right" },
  footer: { marginTop: 24, color: "#999", fontSize: 8 },
});

export function InvoiceDocument({ data, qrString }: { data: InvoiceData; qrString?: string }) {
  const issueDateStr = data.issueDate.toLocaleDateString("cs-CZ");
  const dueDateStr = data.dueDate.toLocaleDateString("cs-CZ");

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.row}>
          <View style={s.col}>
            <Text style={s.h1}>FAKTURA</Text>
            <Text style={{ fontSize: 13, color: "#555" }}>{data.invoiceNumber}</Text>
          </View>
          <View style={[s.col, { alignItems: "flex-end" }]}>
            <Text style={s.label}>Datum vystavení: <Text style={s.value}>{issueDateStr}</Text></Text>
            <Text style={s.label}>Datum splatnosti: <Text style={[s.value, s.bold]}>{dueDateStr}</Text></Text>
          </View>
        </View>

        <View style={s.divider} />

        {/* Parties */}
        <View style={s.row}>
          <View style={s.col}>
            <Text style={s.h2}>Dodavatel</Text>
            <Text style={s.bold}>{data.supplier.name}</Text>
            {data.supplier.street && <Text style={s.value}>{data.supplier.street}</Text>}
            {data.supplier.city && <Text style={s.value}>{data.supplier.zip} {data.supplier.city}</Text>}
            {data.supplier.ico && <Text style={s.label}>IČO: <Text style={s.value}>{data.supplier.ico}</Text></Text>}
            {data.supplier.dic && <Text style={s.label}>DIČ: <Text style={s.value}>{data.supplier.dic}</Text></Text>}
            {data.supplier.bankAccount && <Text style={s.label}>Účet: <Text style={s.value}>{data.supplier.bankAccount}</Text></Text>}
            {data.supplier.bankName && <Text style={s.label}>Banka: <Text style={s.value}>{data.supplier.bankName}</Text></Text>}
          </View>
          <View style={s.col}>
            <Text style={s.h2}>Odběratel</Text>
            <Text style={s.bold}>{data.customer.name}</Text>
            {data.customer.street && <Text style={s.value}>{data.customer.street}</Text>}
            {data.customer.city && <Text style={s.value}>{data.customer.zip} {data.customer.city}</Text>}
            {data.customer.ico && <Text style={s.label}>IČO: <Text style={s.value}>{data.customer.ico}</Text></Text>}
            {data.customer.dic && <Text style={s.label}>DIČ: <Text style={s.value}>{data.customer.dic}</Text></Text>}
          </View>
        </View>

        <View style={s.divider} />

        {/* Items */}
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={s.desc}>Popis</Text>
            <Text style={s.num}>Množství</Text>
            <Text style={s.num}>Jedn.</Text>
            <Text style={s.num}>Cena/jedn.</Text>
            <Text style={s.num}>DPH %</Text>
            <Text style={s.num}>Základ</Text>
            <Text style={s.num}>DPH</Text>
            <Text style={s.num}>Celkem</Text>
          </View>
          {data.items.map((item, i) => (
            <View key={i} style={s.tableRow}>
              <Text style={s.desc}>{item.description}</Text>
              <Text style={s.num}>{item.quantity}</Text>
              <Text style={s.num}>{item.unit}</Text>
              <Text style={s.num}>{formatCzk(item.unitPrice)}</Text>
              <Text style={s.num}>{item.vatRate} %</Text>
              <Text style={s.num}>{formatCzk(item.totalExclVat)}</Text>
              <Text style={s.num}>{formatCzk(item.vatAmount)}</Text>
              <Text style={s.num}>{formatCzk(item.totalInclVat)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={{ marginTop: 12 }}>
          <View style={s.summaryRow}>
            <Text style={s.summaryLabel}>Základ daně:</Text>
            <Text style={s.summaryValue}>{formatCzk(data.totalExclVat)}</Text>
          </View>
          <View style={s.summaryRow}>
            <Text style={s.summaryLabel}>DPH celkem:</Text>
            <Text style={s.summaryValue}>{formatCzk(data.vatAmount)}</Text>
          </View>
          <View style={[s.summaryRow, { marginTop: 4 }]}>
            <Text style={[s.summaryLabel, s.total]}>K ÚHRADĚ:</Text>
            <Text style={[s.summaryValue, s.total]}>{formatCzk(data.totalInclVat)}</Text>
          </View>
        </View>

        {/* DPH §29 rekapitulace */}
        {data.vatSummary.length > 0 && (
          <View style={s.vatTable}>
            <Text style={[s.h2, { marginBottom: 4, marginTop: 8 }]}>Rekapitulace DPH (§29 ZDPH)</Text>
            <View style={s.vatHeader}>
              <Text style={[s.vatCol, { textAlign: "left" }]}>Sazba DPH</Text>
              <Text style={s.vatCol}>Základ</Text>
              <Text style={s.vatCol}>DPH</Text>
              <Text style={s.vatCol}>Celkem</Text>
            </View>
            {data.vatSummary.map((row, i) => (
              <View key={i} style={s.vatRow}>
                <Text style={[s.vatCol, { textAlign: "left" }]}>{row.rate} %</Text>
                <Text style={s.vatCol}>{formatCzk(row.base)}</Text>
                <Text style={s.vatCol}>{formatCzk(row.vat)}</Text>
                <Text style={s.vatCol}>{formatCzk(row.total)}</Text>
              </View>
            ))}
          </View>
        )}

        {qrString && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 8, color: "#666" }}>QR platba: {qrString}</Text>
          </View>
        )}

        <Text style={s.footer}>Vygenerováno systémem Řemeslník.app</Text>
      </Page>
    </Document>
  );
}
