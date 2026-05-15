import PageHeader from '@/components/ui/PageHeader'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-brand-green-dark mb-4 text-xl font-semibold">{title}</h2>
      <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export default function PoliticasPrivacidadPage() {
  return (
    <>
      <PageHeader
        label="Legal"
        title="Políticas de Privacidad"
        subtitle="Nos comprometemos a proteger y respetar tu privacidad. Lee cómo tratamos tu información."
      />

      <article className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-muted-foreground mb-10 border-b pb-6 text-sm">
          Última actualización: enero de 2026. Esta política aplica a todos los usuarios de{' '}
          <strong className="text-foreground">setasmedicinales.co</strong> y sus servicios
          relacionados.
        </p>

        <Section title="1. Responsable del Tratamiento">
          <p>
            Setas Medicinales S.A.S., con domicilio en Bogotá, Colombia, es el responsable del
            tratamiento de los datos personales recopilados a través de esta plataforma, en
            cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013 sobre protección de datos
            personales en Colombia.
          </p>
        </Section>

        <Section title="2. Recopilación de Datos Personales">
          <p>
            Recopilamos información personal cuando te registras en nuestra plataforma, realizas una
            compra, te suscribes a nuestro boletín o te comunicas con nosotros. Los datos que podemos
            recopilar incluyen:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Nombre completo e información de contacto (correo electrónico, teléfono)</li>
            <li>Dirección de entrega y facturación</li>
            <li>Información de pago (procesada de forma segura por terceros certificados)</li>
            <li>Historial de pedidos y preferencias de compra</li>
            <li>Datos de navegación y comportamiento en la plataforma</li>
          </ul>
        </Section>

        <Section title="3. Uso de la Información">
          <p>
            La información recopilada se utiliza exclusivamente para los siguientes propósitos:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Procesar y gestionar tus pedidos y pagos</li>
            <li>Enviarte confirmaciones de compra y actualizaciones de envío</li>
            <li>Brindarte atención al cliente y resolver solicitudes</li>
            <li>Mejorar nuestros productos, servicios y experiencia de usuario</li>
            <li>Enviarte comunicaciones de marketing (solo con tu consentimiento previo)</li>
            <li>Cumplir obligaciones legales y fiscales aplicables en Colombia</li>
          </ul>
          <p>
            No vendemos, alquilamos ni compartimos tu información personal con terceros para fines
            comerciales ajenos a la prestación de nuestros servicios.
          </p>
        </Section>

        <Section title="4. Cookies y Tecnologías de Seguimiento">
          <p>
            Utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación,
            recordar tus preferencias y analizar el uso de la plataforma. Puedes controlar el uso de
            cookies a través de la configuración de tu navegador.
          </p>
          <p>
            <strong className="text-foreground">Cookies estrictamente necesarias:</strong> Requeridas
            para el funcionamiento básico de la plataforma (sesión, carrito de compras).
          </p>
          <p>
            <strong className="text-foreground">Cookies analíticas:</strong> Nos ayudan a entender
            cómo los usuarios interactúan con la plataforma (Google Analytics u herramientas
            similares).
          </p>
          <p>
            Puedes deshabilitar las cookies no esenciales sin afectar la funcionalidad principal del
            sitio.
          </p>
        </Section>

        <Section title="5. Derechos del Usuario">
          <p>
            Como titular de tus datos personales, tienes los siguientes derechos conforme a la Ley
            1581 de 2012:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong className="text-foreground">Acceso:</strong> Conocer qué datos tenemos sobre ti
            </li>
            <li>
              <strong className="text-foreground">Rectificación:</strong> Corregir información
              inexacta o incompleta
            </li>
            <li>
              <strong className="text-foreground">Supresión:</strong> Solicitar la eliminación de tus
              datos cuando no sean necesarios
            </li>
            <li>
              <strong className="text-foreground">Portabilidad:</strong> Recibir tus datos en un
              formato estructurado
            </li>
            <li>
              <strong className="text-foreground">Oposición:</strong> Oponerte al tratamiento de tus
              datos para fines de marketing
            </li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, escríbenos a{' '}
            <strong className="text-foreground">privacidad@setasmedicinales.co</strong>.
          </p>
        </Section>

        <Section title="6. Seguridad de la Información">
          <p>
            Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos
            personales contra acceso no autorizado, pérdida, alteración o divulgación. Toda la
            información transmitida en nuestra plataforma está cifrada mediante SSL/TLS.
          </p>
          <p>
            Los datos de pago son procesados directamente por pasarelas de pago certificadas (PSE,
            Stripe) y nunca son almacenados en nuestros servidores.
          </p>
        </Section>

        <Section title="7. Cambios a esta Política">
          <p>
            Podemos actualizar esta política periódicamente. Te notificaremos por correo electrónico
            o mediante un aviso visible en la plataforma ante cualquier cambio significativo. Te
            recomendamos revisar esta página regularmente.
          </p>
          <p>
            Si tienes preguntas sobre esta política, contáctanos en{' '}
            <strong className="text-foreground">hola@setasmedicinales.co</strong>.
          </p>
        </Section>
      </article>
    </>
  )
}
