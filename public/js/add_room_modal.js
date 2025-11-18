export function initModal(modalId) {
    const addRoomModal = document.getElementById(modalId);

    // Modal resetten beim Öffnen
    addRoomModal.addEventListener('hidden.bs.modal', () => {
        document.getElementById('room_name').value = '';
        const alertEl = document.getElementById('successAlert');
        alertEl.classList.remove('show');
        alertEl.classList.add('d-none');
    });

    // Raum hinzufügen Button
    document.getElementById('saveroomBtn').addEventListener('click', () => {
        const alertEl = document.getElementById('successAlert');
        alertEl.classList.remove('d-none');
        alertEl.classList.add('show');

        // Modal schließen nach 2 Sekunden
        const modal = bootstrap.Modal.getOrCreateInstance(addRoomModal);
        setTimeout(() => modal.hide(), 2000);

        // Alert automatisch nach 2 Sekunden ausblenden
        setTimeout(() => {
            alertEl.classList.remove('show');
            alertEl.classList.add('d-none');
        }, 2000);
    });


    document.getElementById('saveroomBtn').addEventListener('click', async () => {
        const roomName = document.getElementById('room_name').value.trim();
        if (!roomName) return;

        try {
            const response = await fetch('/api/rooms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: roomName })
            });

            if (response.ok) {
                const alertEl = document.getElementById('successAlert');
                alertEl.classList.remove('d-none');
                alertEl.classList.add('show');

                const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('addRoomModal'));
                setTimeout(() => modal.hide(), 2000);

                setTimeout(() => {
                    alertEl.classList.remove('show');
                    alertEl.classList.add('d-none');
                }, 2000);

                document.getElementById('room_name').value = '';
            } else {
                alert("Fehler beim Speichern!");
            }
        } catch (err) {
            console.error(err);
            alert("Serverfehler!");
        }
    });
}