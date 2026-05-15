import PageHeader from '@/components/ui/PageHeader'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-brand-green-dark mb-4 text-xl font-semibold">{title}</h2>
      <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export default function TerminosCondicionesPage() {
  return (
    <>
      <PageHeader
        label="Legal"
        title="Términos y Condiciones"
        subtitle="Al usar nuestra plataforma aceptas estos términos. Léelos con atención antes de realizar una compra."
      />

      <article className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-muted-foreground mb-10 border-b pb-6 text-sm">
          Última actualización: enero de 2026. Estos términos aplican a todos los usuarios de{' '}
          <strong className="text-foreground">setasmedicinales.co</strong>. Al acceder y usar esta
          plataforma, aceptas estar vinculado por estos términos.
        </p>

        <Section title="1. Condiciones de Uso">
          <p>
            Al acceder a esta plataforma, declaras ser mayor de 18 años y tener capacidad legal para
            celebrar contratos. El uso de esta plataforma está sujeto a las leyes colombianas
            aplicables y a las presentes condiciones.
          </p>
          <p>
            Nos reservamos el derecho de suspender o cancelar cuentas que violen estas condiciones,
            utilicen la plataforma de forma fraudulenta o realicen actividades que puedan dañar a
            otros usuarios o a nuestra empresa.
          </p>
        </Section>

        <Section title="2. Proceso de Compra">
          <p>
            Para realizar una compra debes crear una cuenta con información veraz y actualizada. Al
            confirmar un pedido:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Recibirás una confirmación por correo electrónico con el resumen de tu pedido</li>
            <li>El pedido se procesa una vez confirmado el pago exitosamente</li>
            <li>Recibirás actualizaciones sobre el estado de tu envío por correo</li>
            <li>El contrato de compraventa se perfecciona al confirmar el despacho del pedido</li>
          </ul>
          <p>
            Setas Medicinales se reserva el derecho de rechazar o cancelar pedidos en casos de
            error en el precio, disponibilidad de inventario o sospecha de fraude.
          </p>
        </Section>

        <Section title="3. Precios y Pagos">
          <p>
            Todos los precios están expresados en Pesos Colombianos (COP) e incluyen IVA cuando
            aplica. Los precios pueden cambiar sin previo aviso, pero el precio que pagas es el
            vigente al momento de confirmar tu pedido.
          </p>
          <p>
            Aceptamos pagos a través de PSE, tarjetas débito y crédito Visa y Mastercard. El
            procesamiento de pagos está a cargo de pasarelas certificadas con estándares PCI-DSS.
          </p>
          <p>
            En caso de que un pago sea rechazado o revertido de forma indebida, nos reservamos el
            derecho de suspender la cuenta del usuario y gestionar el cobro por los medios legales
            disponibles.
          </p>
        </Section>

        <Section title="4. Disponibilidad de Productos">
          <p>
            La disponibilidad de productos mostrada en la plataforma es orientativa y puede variar.
            Si un producto no está disponible después de realizado tu pedido, te notificaremos de
            inmediato y realizaremos el reembolso completo en un plazo máximo de 5 días hábiles.
          </p>
        </Section>

        <Section title="5. Responsabilidades">
          <p>
            Setas Medicinales no se hace responsable por daños derivados del uso incorrecto de los
            productos. Los hongos medicinales son suplementos naturales y no reemplazan tratamientos
            médicos. Consulta con un profesional de salud antes de usar nuestros productos si tienes
            condiciones médicas preexistentes.
          </p>
          <p>
            No garantizamos que la plataforma esté disponible de forma ininterrumpida. Podemos
            realizar mantenimientos programados con aviso previo a los usuarios registrados.
          </p>
        </Section>

        <Section title="6. Propiedad Intelectual">
          <p>
            Todo el contenido de esta plataforma —textos, imágenes, logotipos, diseños y código—
            es propiedad de Setas Medicinales S.A.S. o de sus licenciantes y está protegido por las
            leyes de propiedad intelectual colombianas e internacionales.
          </p>
          <p>
            Queda prohibida la reproducción, distribución o modificación de cualquier contenido sin
            autorización escrita previa. El uso de nuestros contenidos para fines comerciales sin
            permiso constituye una infracción de derechos de autor.
          </p>
        </Section>

        <Section title="7. Ley Aplicable y Jurisdicción">
          <p>
            Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia
            derivada del uso de esta plataforma se someterá a los tribunales competentes de la ciudad
            de Bogotá D.C., Colombia.
          </p>
        </Section>

        <Section title="8. Modificaciones">
          <p>
            Podemos modificar estos términos en cualquier momento. Las modificaciones entran en vigor
            desde su publicación en la plataforma. El uso continuado de la plataforma tras la
            publicación de cambios implica la aceptación de los nuevos términos.
          </p>
          <p>
            Para cualquier consulta, escríbenos a{' '}
            <strong className="text-foreground">legal@setasmedicinales.co</strong>.
          </p>
        </Section>
      </article>
    </>
  )
}
