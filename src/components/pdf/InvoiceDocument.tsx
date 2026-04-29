import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { InvoiceData } from "@/lib/invoice";
import { buildQrPaymentString } from "@/lib/utils";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: { fontFamily: "Roboto", fontSize: 9, padding: 40, color: "#1a1a1a" },
  title: { fontSize: 22, fontWeight: 700, marginBottom: 20, color: "#f97316" },
  row: { flexDirection: "row", gap: 20, marginBottom: 20 },
  col: { flex: 1 },
  sectionTitle: { fontSize: 8, fontWeight: 700, color: "#666", textTransform: "uppercase", marginBottom: 4 },
  bold: { fontWeight: 700 },
  table: { marginTop: 20 },
  tableHeader: { flexDirection: "row", backgroundColor: "#f5f5f5", padding: "6 4", borderRadius: 2 },
  tableRow: { flexDirection: "row", padding: "5 4", borderBottom: "0.5 solid #e5e5e5" },
  tableFooter: { flexDirection: "row", padding: "6 4", backgroundColor: "#fff7ed", marginTop: 2 },
  colDesc: { flex: 3 },
  colNum: { flex: 1, textAlign: "right" },
  vatTable: { marginTop: 16 },
  divider: { borderTop: "0.5 solid #e5e5e5", marginVertical: 8 },
  total: { flexDirection: "row", justifyContent: "flex-end", marginTop: 4 },
  totalLabel: { width: 120, textAlign: "right", color: "#666" },
  totalValue: { width: 80, textAlign: "right" },
  totalBold: { fontWeight: 700, fontSize: 12 },
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, fontSize: 7.5, color: "#999", textAlign: "center" },
  qrNote: { marginTop: 16, padding: 8, backgroundColor: "#f9fafb", borderRadius: 4 },
});

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("cs-CZ").format(d);
}

function formatCzk(halers: number) {
  return new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK" }).format(halers / 100);
}

interface Props {
  data: InvoiceData;
}

export function InvoiceDocument({ data }: Props) {
  const qrString =
    data.supplier.bankAccount && data.totalInclVat > 0
      ? buildQrPaymentString({
          iban: data.supplier.bankAccount,
          amount: data.totalInclVat,
          variableSymbol: data.invoiceNumber.replace("-", ""),
          message: `Faktura ${data.invoiceNumber}`,
        })
      : null;

  return (
    <Document title={`Faktura č. ${data.invoiceNumber}`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>FAKTURA č. {data.invoiceNumber}</Text>

        {/* Parties */}
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Dodavatel</Text>
            <Text style={styles.bold}>{data.supplier.name}</Text>
            {data.supplier.street && <Text>{data.supplier.street}</Text>}
            {data.supplier.city && (
              <Text>
                {data.supplier.zip} {data.supplier.city}
              </Text>
            )}
            {data.supplier.ico && <Text>IČO: {data.supplier.ico}</Text>}
            {data.supplier.dic && <Text>DIČ: {data.supplier.dic}</Text>}
            {data.supplier.bankAccount && (
              <Text style={{ marginTop: 4 }}>
                Bankovní spojení: {data.supplier.bankAccount}
                {data.supplier.bankName ? ` (${data.supplier.bankName})` : ""}
              </Text>
            )}
          </View>

          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Odběratel</Text>
            <Text style={styles.bold}>{data.customer.name}</Text>
            {data.customer.street && <Text>{data.customer.street}</Text>}
            {data.customer.city && (
              <Text>
                {data.customer.zip} {data.customer.city}
              </Text>
            )}
            {data.customer.ico && <Text>IČO: {data.customer.ico}</Text>}
            {data.customer.dic && <Text>DIČ: {data.customer.dic}</Text>}
          </View>

          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Údaje faktury</Text>
            <Text>Datum vystavení: {formatDate(data.issueDate)}</Text>
            <Text>Datum splatnosti: {formatDate(data.dueDate)}</Text>
            <Text>Datum plnění: {formatDate(data.issueDate)}</Text>
            <Text>Variabilní symbol: {data.invoiceNumber.replace("-", "")}</Text>
          </View>
        </View>

        {/* Items table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDesc}>Popis</Text>
            <Text style={styles.colNum}>Mn.</Text>
            <Text style={styles.colNum}>Jedn.</Text>
            <Text style={styles.colNum}>Cena/jedn.</Text>
            <Text style={styles.colNum}>DPH</Text>
            <Text style={styles.colNum}>Bez DPH</Text>
            <Text style={styles.colNum}>Celkem</Text>
          </View>
          {data.items.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.colDesc}>{item.description}</Text>
              <Text style={styles.colNum}>{item.quantity}</Text>
              <Text style={styles.colNum}>{item.unit}</Text>
              <Text style={styles.colNum}>{formatCzk(item.unitPrice)}</Text>
              <Text style={styles.colNum}>{item.vatRate}%</Text>
              <Text style={styles.colNum}>{formatCzk(item.totalExclVat)}</Text>
              <Text style={styles.colNum}>{formatCzk(item.totalInclVat)}</Text>
            </View>
          ))}
        </View>

        {/* DPH summary (§29 ZDPH) */}
        <View style={styles.vatTable}>
          <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Rekapitulace DPH</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.colNum}>Sazba DPH</Text>
            <Text style={styles.colNum}>Základ</Text>
            <Text style={styles.colNum}>DPH</Text>
            <Text style={styles.colNum}>Celkem</Text>
          </View>
          {data.vatSummary.map((row, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.colNum}>{row.rate}%</Text>
              <Text style={styles.colNum}>{formatCzk(row.base)}</Text>
              <Text style={styles.colNum}>{formatCzk(row.vat)}</Text>
              <Text style={styles.colNum}>{formatCzk(row.total)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.divider} />
        <View style={styles.total}>
          <Text style={styles.totalLabel}>Základ daně celkem:</Text>
          <Text style={styles.totalValue}>{formatCzk(data.totalExclVat)}</Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalLabel}>DPH celkem:</Text>
          <Text style={styles.totalValue}>{formatCzk(data.vatAmount)}</Text>
        </View>
        <View style={[styles.total, { marginTop: 4 }]}>
          <Text style={[styles.totalLabel, styles.totalBold]}>K úhradě:</Text>
          <Text style={[styles.totalValue, styles.totalBold, { color: "#f97316" }]}>
            {formatCzk(data.totalInclVat)}
          </Text>
        </View>

        {/* QR platba */}
        {qrString && (
          <View style={styles.qrNote}>
            <Text style={styles.sectionTitle}>QR Platba</Text>
            <Text style={{ fontFamily: "Courier", fontSize: 7 }}>{qrString}</Text>
          </View>
        )}

        <Text style={styles.footer}>
          Vystaveno systémem Řemeslník.app — Daňový doklad vystavený dle §26 ZDPH
        </Text>
      </Page>
    </Document>
  );
}
