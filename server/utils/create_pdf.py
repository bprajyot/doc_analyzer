from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from io import BytesIO



def create_pdf(data):
    """Generate a PDF in memory and return bytes."""
    buffer = BytesIO()
    pdf = SimpleDocTemplate(buffer, pagesize=A4)
    styles = getSampleStyleSheet()
    elements = []

    # Title
    elements.append(Paragraph(f"<b>{data['title']}</b>", styles['Title']))
    elements.append(Spacer(1, 12))

    # Document Info
    doc_info = data.get("document", {})
    elements.append(Paragraph("<b>Document Details:</b>", styles['Heading2']))
    elements.append(Paragraph(f"Filename: {doc_info.get('filename', 'N/A')}", styles['Normal']))
    elements.append(Paragraph(f"Summary: {doc_info.get('summary', 'N/A')}", styles['Normal']))
    elements.append(Spacer(1, 10))

    # Metadata Table
    metadata = doc_info.get("metadata", {})
    if metadata:
        table_data = [["Key", "Value"]] + [[k, str(v)] for k, v in metadata.items()]
        table = Table(table_data)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.lightgrey),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold')
        ]))
        elements.append(table)
        elements.append(Spacer(1, 12))

    # Risk Description
    elements.append(Paragraph("<b>Risk Description:</b>", styles['Heading2']))
    elements.append(Paragraph(data.get("description", "No description available."), styles['Normal']))

    # Build PDF
    pdf.build(elements)
    buffer.seek(0)
    return buffer.getvalue()