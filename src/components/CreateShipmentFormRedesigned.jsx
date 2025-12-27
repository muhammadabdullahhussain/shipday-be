import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';
import { toast } from 'react-toastify';
import '../styles/ui/CreateShipmentFormRedesigned.css';

// Import step components (we'll create these)
import SenderDetailsStep from './shipment-steps/SenderDetailsStep';
import CollectionDetailsStep from './shipment-steps/CollectionDetailsStep';
import DeliveryDetailsStep from './shipment-steps/DeliveryDetailsStep';
import ParcelDetailsStep from './shipment-steps/ParcelDetailsStep';
import TermsAndPaymentStep from './shipment-steps/TermsAndPaymentStep';

// Progress Navigation Component
const Nav = (props) => {
    const steps = [
        { label: 'Sender', icon: 'bi-person-fill' },
        { label: 'Collection', icon: 'bi-geo-alt-fill' },
        { label: 'Delivery', icon: 'bi-truck' },
        { label: 'Parcel', icon: 'bi-box-seam-fill' },
        { label: 'Payment', icon: 'bi-credit-card-fill' }
    ];

    return (
        <div className="step-progress-container px-4 pt-4 pb-2">
            <div className="position-relative">
                {/* Progress Track Background */}
                <div className="position-absolute top-50 start-0 translate-middle-y w-100 bg-light rounded" style={{ height: '4px', zIndex: 0 }}></div>

                {/* Active Progress Track */}
                <div
                    className="position-absolute top-50 start-0 translate-middle-y rounded transition-all"
                    style={{
                        height: '4px',
                        width: `${((props.currentStep - 1) / (props.totalSteps - 1)) * 100}%`,
                        zIndex: 0,
                        transition: 'width 0.4s ease',
                        backgroundColor: 'var(--brand-yellow)'
                    }}
                ></div>

                {/* Steps */}
                <div className="d-flex justify-content-between position-relative" style={{ zIndex: 1 }}>
                    {steps.map((step, index) => {
                        const stepNum = index + 1;
                        const isActive = props.currentStep === stepNum;
                        const isCompleted = props.currentStep > stepNum;

                        let circleClass = 'bg-white border border-2 border-secondary text-muted';
                        if (isActive) circleClass = 'bg-brand-yellow border-brand-primary text-dark shadow-lg scale-110';
                        if (isCompleted) circleClass = 'bg-success border-success text-white';

                        return (
                            <div
                                key={index}
                                className="d-flex flex-column align-items-center"
                                style={{ cursor: props.currentStep > stepNum ? 'pointer' : 'default', width: '80px' }}
                                onClick={() => props.currentStep > stepNum && props.goToStep(stepNum)}
                            >
                                <div
                                    className={`rounded-circle d-flex align-items-center justify-content-center transition-all ${circleClass}`}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        transition: 'all 0.3s ease',
                                        transform: isActive ? 'scale(1.2)' : 'scale(1)'
                                    }}
                                >
                                    {isCompleted ? <i className="bi bi-check-lg"></i> : <i className={`bi ${step.icon}`}></i>}
                                </div>
                                <span
                                    className={`mt-2 small fw-bold text-center transition-all ${isActive ? 'text-primary' : 'text-muted'}`}
                                    style={{ fontSize: '12px', whiteSpace: 'nowrap' }}
                                >
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const CreateShipmentFormRedesigned = ({ onSubmit, onCancel, loading, isPublic }) => {
    const [formData, setFormData] = useState({
        // Sender Details
        senderFullName: '',
        senderCompany: '',
        senderEmail: '',
        senderMobile: '',
        senderTelephone: '',
        senderAddress: {
            street: '',
            suburb: '',
            city: '',
            complex: '',
            province: '',
            postalCode: ''
        },

        // Collection Details
        dispatcherName: '',
        collectionCompany: '',
        collectionMobile: '',
        collectionOffice: '',
        collectionEmail: '',
        collectionAddress: {
            street: '',
            suburb: '',
            city: '',
            complex: '',
            province: '',
            postalCode: '',
            useGeolocation: false,
            numberOfItems: 1
        },

        // Delivery Details
        receiverName: '',
        deliveryCompany: '',
        receiverMobile: '',
        receiverOffice: '',
        receiverEmail: '',
        deliveryAddress: {
            street: '',
            suburb: '',
            city: '',
            complex: '',
            province: '',
            postalCode: '',
            useGeolocation: false
        },

        // Parcel Details
        serviceType: 'economy', // economy or express
        parcelType: 'custom', // satchel-a4, satchel-a3, custom
        dimensions: {
            length: '',
            width: '',
            height: '',
            weight: ''
        },
        specialInstructions: '',
        calculatedPrice: 0,

        // Payment
        paymentMethod: 'gateway', // ewallet, gateway, cod
        termsAccepted: false
    });

    const updateFormData = (newData) => {
        setFormData(prev => ({
            ...prev,
            ...newData
        }));
    };

    const handleFinalSubmit = (overrideData = {}) => {
        // Merge current formData with any immediate overrides (like payment method from modal)
        const finalData = { ...formData, ...overrideData };

        if (!finalData.termsAccepted) {
            toast.error('Please accept terms and conditions');
            return;
        }

        // Structure data for backend using finalData
        const payload = {
            senderDetails: {
                fullName: finalData.senderFullName,
                company: finalData.senderCompany,
                email: finalData.senderEmail,
                mobile: finalData.senderMobile,
                telephone: finalData.senderTelephone,
                address: finalData.senderAddress
            },
            collectionDetails: {
                dispatcherName: finalData.dispatcherName,
                company: finalData.collectionCompany,
                mobile: finalData.collectionMobile,
                office: finalData.collectionOffice,
                email: finalData.collectionEmail,
                address: finalData.collectionAddress,
                numberOfItems: finalData.collectionAddress.numberOfItems
            },
            deliveryDetails: {
                receiverName: finalData.receiverName,
                company: finalData.deliveryCompany,
                mobile: finalData.receiverMobile,
                office: finalData.receiverOffice,
                email: finalData.receiverEmail,
                address: finalData.deliveryAddress
            },
            parcelDetails: {
                serviceType: finalData.serviceType,
                parcelType: finalData.parcelType,
                dimensions: finalData.dimensions,
                specialInstructions: finalData.specialInstructions
            },
            payment: {
                method: finalData.paymentMethod,
                amount: finalData.calculatedPrice
            }
        };

        console.log("SENDING PAYLOAD:", payload); // Debug Log

        onSubmit(payload);
    };

    return (
        <div className="shipment-form-redesigned">
            <StepWizard
                nav={<Nav />}
                isHashEnabled={false}
                transitions={{
                    enterRight: 'animated enterRight',
                    enterLeft: 'animated enterLeft',
                    exitRight: 'animated exitRight',
                    exitLeft: 'animated exitLeft'
                }}
            >
                <SenderDetailsStep
                    formData={formData}
                    updateFormData={updateFormData}
                />
                <CollectionDetailsStep
                    formData={formData}
                    updateFormData={updateFormData}
                />
                <DeliveryDetailsStep
                    formData={formData}
                    updateFormData={updateFormData}
                />
                <ParcelDetailsStep
                    formData={formData}
                    updateFormData={updateFormData}
                />
                <TermsAndPaymentStep
                    formData={formData}
                    updateFormData={updateFormData}
                    onSubmit={handleFinalSubmit}
                    onCancel={onCancel}
                    loading={loading}
                    isPublic={isPublic}
                />
            </StepWizard>
        </div>
    );
};

export default CreateShipmentFormRedesigned;
