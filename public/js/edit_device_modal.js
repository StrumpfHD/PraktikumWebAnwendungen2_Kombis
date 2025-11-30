let editDeviceCallback = null;
let selectedRoomId = null;
let selectedTypeId = null;

// Modal einmalig laden
fetch('edit_device_modal.html')
    .then(res => res.text())
    .then(html => {
        document.body.insertAdjacentHTML('beforeend', html);

        const modalEl = document.getElementById('editDeviceModal');
        const modalInstance = new bootstrap.Modal(modalEl);

        const roomDropdownBtn = document.getElementById('editDropdownRoom');
        const roomDropdownMenu = roomDropdownBtn.nextElementSibling;

        const typeDropdownBtn = document.getElementById('editDropdownType');
        const typeDropdownMenu = typeDropdownBtn.nextElementSibling;

        const deviceNameInput = document.getElementById('editDeviceName');
        const saveBtn = document.getElementById('saveEditDeviceBtn');

        // Speichern Button
        saveBtn.addEventListener('click', async () => {
            if (!deviceNameInput.value.trim() || !selectedRoomId || !selectedTypeId) {
                alert('Bitte alle Felder ausfüllen!');
                return;
            }

            if (typeof editDeviceCallback === 'function') {
                // Hier 'value' aus dem aktuellen Device-Objekt speichern
                await editDeviceCallback({
                    name: deviceNameInput.value.trim(),
                    room_id: selectedRoomId,
                    device_type_id: selectedTypeId,
                    value: currentDeviceValue  // z.B. in openEditDeviceModal setzen
                });
            }

            modalInstance.hide();
            editDeviceCallback = null;
        });

    });

/**
 * Gerät bearbeiten Modal öffnen
 */
export async function openEditDeviceModal(device, callback) {
    const modalEl = document.getElementById('editDeviceModal');
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);

    const roomDropdownBtn = document.getElementById('editDropdownRoom');
    const roomDropdownMenu = roomDropdownBtn.nextElementSibling;

    const typeDropdownBtn = document.getElementById('editDropdownType');
    const typeDropdownMenu = typeDropdownBtn.nextElementSibling;

    const deviceNameInput = document.getElementById('editDeviceName');
    const saveBtn = document.getElementById('saveEditDeviceBtn');

    let currentDeviceValue = device.value; // Wert speichern

    // Werte vorausfüllen
    deviceNameInput.value = device.name;
    selectedRoomId = device.room_id;
    selectedTypeId = device.device_type_id;

    // Räume laden
    const roomsRes = await fetch('/api/rooms');
    const rooms = await roomsRes.json();
    roomDropdownMenu.innerHTML = '';
    rooms.forEach(room => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('dropdown-item');
        a.href = '#';
        a.textContent = room.name;
        a.addEventListener('click', e => {
            e.preventDefault();
            selectedRoomId = room.room_id;
            roomDropdownBtn.textContent = room.name;
        });
        li.appendChild(a);
        roomDropdownMenu.appendChild(li);
    });
    const currentRoom = rooms.find(r => r.room_id === device.room_id);
    roomDropdownBtn.textContent = currentRoom?.name || 'Raum auswählen';

    // Gerätetypen laden
    const typesRes = await fetch('/api/device_types');
    const types = await typesRes.json();
    typeDropdownMenu.innerHTML = '';
    types.forEach(type => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('dropdown-item');
        a.href = '#';
        a.textContent = type.name;
        a.addEventListener('click', e => {
            e.preventDefault();
            selectedTypeId = type.device_type_id;
            typeDropdownBtn.textContent = type.name;
        });
        li.appendChild(a);
        typeDropdownMenu.appendChild(li);
    });
    const currentType = types.find(t => t.device_type_id === device.device_type_id);
    typeDropdownBtn.textContent = currentType?.name || 'Geräteart auswählen';

    // Eventlistener für Speichern innerhalb von openEditDeviceModal
    saveBtn.onclick = async () => {
        if (!deviceNameInput.value.trim() || !selectedRoomId || !selectedTypeId) {
            alert('Bitte alle Felder ausfüllen!');
            return;
        }

        if (typeof callback === 'function') {
            await callback({
                name: deviceNameInput.value.trim(),
                room_id: selectedRoomId,
                device_type_id: selectedTypeId,
                value: currentDeviceValue
            });
        }

        modalInstance.hide();
    };

    // Modal anzeigen
    modalInstance.show();

    // Eventlistener nach Schließen entfernen
    modalEl.addEventListener('hidden.bs.modal', () => {
        saveBtn.onclick = null;
    }, { once: true });
}

