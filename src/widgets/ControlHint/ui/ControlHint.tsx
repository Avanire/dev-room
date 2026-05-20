import { COLORS } from 'shared/config/retroFutureTheme';

export const ControlHint = () => {
    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 500,
                pointerEvents: 'none', // чтобы не перехватывать клики
                background: 'rgba(10, 10, 26, 0.8)',
                backdropFilter: 'blur(4px)',
                border: `1px solid ${COLORS.neonCyan}`,
                borderRadius: '8px',
                padding: '12px 16px',
                fontFamily: '"Orbitron", monospace',
                fontSize: '11px',
                color: COLORS.neonCyan,
                textShadow: `0 0 5px ${COLORS.neonCyan}`,
                boxShadow: `0 0 15px ${COLORS.neonCyan}44`,
                lineHeight: 1.6,
                maxWidth: '200px',
            }}
        >
            <div style={{ marginBottom: '4px', fontWeight: 700 }}>Управление</div>
            <div>← → ↑ ↓ — движение</div>
        </div>
    );
};
