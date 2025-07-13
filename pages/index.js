
import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import Button from '../components/ui/button';
import Card from '../components/ui/card';
import Input from '../components/ui/input';
import Label from '../components/ui/label';
import Select from '../components/ui/select';

export default function Home() {
  const [customerInfo, setCustomerInfo] = useState({ name: '', project: '', email: '' });
  const [lineItems, setLineItems] = useState([]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Spray Foam Insulation Quote', 20, 20);
    doc.setFontSize(12);
    doc.text(`Customer: ${customerInfo.name}`, 20, 30);
    doc.text(`Project: ${customerInfo.project}`, 20, 36);
    doc.text(`Email: ${customerInfo.email}`, 20, 42);
    doc.autoTable({
      startY: 50,
      head: [['Zone', 'Sqft', 'Depth', 'Board Ft', 'Sets', '$/Set', 'Total']],
      body: lineItems.map(item => [
        item.zone, item.sqft, item.depth, item.boardFeet,
        item.setsNeeded, `$${item.pricePerSet}`, `$${item.totalPrice}`
      ])
    });
    doc.save('spray-foam-quote.pdf');
  };

  return (
    <div>
      <h1>Spray Foam Quote Builder</h1>
      <Input placeholder="Customer Name" value={customerInfo.name} onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })} />
      <Input placeholder="Project Name" value={customerInfo.project} onChange={e => setCustomerInfo({ ...customerInfo, project: e.target.value })} />
      <Input placeholder="Email" value={customerInfo.email} onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })} />
      <Button onClick={handleExportPDF}>Export PDF</Button>
    </div>
  );
}
