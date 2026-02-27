'use client';

interface Props {
    giftDelivery: 'email' | 'manual';
    setGiftDelivery: (v: 'email' | 'manual') => void;
    giftEmail: string;
    setGiftEmail: (v: string) => void;
}

export const GiftOptions = ({ giftDelivery, setGiftDelivery, giftEmail, setGiftEmail }: Props) => {
    return (
        <div className="flex flex-col gap-4 mt-2">
            <h3 className="text-sm font-medium text-white/80">Cómo entregar el regalo</h3>
            <div className="flex flex-col gap-2">
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-200 ${giftDelivery === 'email' ? 'border-stannum bg-stannum/5' : 'border-card hover:border-card-light'}`}>
                    <input
                        type="radio"
                        name="giftDelivery"
                        checked={giftDelivery === 'email'}
                        onChange={() => setGiftDelivery('email')}
                        className="accent-stannum"
                    />
                    <div>
                        <span className="text-sm font-medium">Enviar por correo electrónico</span>
                        <p className="text-xs text-white/50">Enviaremos la clave de activación al destinatario</p>
                    </div>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-200 ${giftDelivery === 'manual' ? 'border-stannum bg-stannum/5' : 'border-card hover:border-card-light'}`}>
                    <input
                        type="radio"
                        name="giftDelivery"
                        checked={giftDelivery === 'manual'}
                        onChange={() => setGiftDelivery('manual')}
                        className="accent-stannum"
                    />
                    <div>
                        <span className="text-sm font-medium">La enviaré yo</span>
                        <p className="text-xs text-white/50">Recibirás la clave para compartirla manualmente</p>
                    </div>
                </label>
            </div>

            {giftDelivery === 'email' && (
                <div className="flex flex-col gap-1">
                    <label htmlFor="giftEmail" className="text-sm text-white/60">Correo del destinatario</label>
                    <input
                        id="giftEmail"
                        type="email"
                        value={giftEmail}
                        onChange={e => setGiftEmail(e.target.value)}
                        placeholder="nombre@ejemplo.com"
                        className="w-full py-2.5 px-3 rounded-lg bg-card border border-card-light text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-stannum transition-200"
                    />
                </div>
            )}
        </div>
    );
};
