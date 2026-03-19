// src/components/DynamicServices.js
'use client';

import { useAPI } from '@/hooks/useAPI';

export default function DynamicServices() {
  const { data, loading, error } = useAPI('/api/services');
  const services = data?.services || [];

  if (loading) {
    return (
      <section className="py-20" id="services_section">
        <div className="services_container">
          <div className="text-center mb-16">
            <h2 style={{ color: "#060134" }}>What We Offer !</h2>
            <p className="services_description">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20" id="services_section">
        <div className="services_container">
          <div className="text-center mb-16">
            <h2 style={{ color: "#060134" }}>What We Offer !</h2>
            <p className="services_description">Unable to load services</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20" id="services_section">
      <div className="services_container">
        <div className="text-center mb-16">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: "#060134" }}
          >
            What We Offer !
          </h2>
          <p className="services_description">
            Tailored digital solutions that scale with your ambition.
          </p>
        </div>

        <div className="service_card_hold">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={service.$id || index}
                className="service_card text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>
                  {service.icon || '⚙️'}
                </div>
                <div className="service_card_text">
                  <h1>{service.title}</h1>
                  <p>{service.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
              <p>No services available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
