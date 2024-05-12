function BookingVehicle({ vehicles, form, setForm, formatDate, convertToAMPM }) {

    return (
        <div className="container">
            {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="border rounded-md p-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">Model: {vehicle.model}</h2>
                    <p
                        className="text-white mb-2 flex justify-between items-center">
                        Plate number: {vehicle.plate_number}
                        {form.vehicle_id === vehicle.id ? (
                            <button
                                className="btn cursor-default text-white border-accent bg-transparent hover:border-accent hover:bg-transparent">
                                Assigned
                            </button>
                        ) : (
                            <button
                                onClick={() => setForm({ ...form, vehicle_id: vehicle.id })}
                                className="btn btn-accent">
                                Assign
                            </button>
                        )}

                    </p>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Active travels</h2>
                        {vehicle.travels.length > 0 ? (
                            vehicle.travels.map((travel) => (
                                <div key={travel.id} className="border rounded-md p-2 mb-2 bg-transparent">
                                    <p><span className="font-semibold">Date:</span> {formatDate(travel.pickup_date)}</p>
                                    <p><span className="font-semibold">Time:</span> {convertToAMPM(travel.pickup_time)}</p>
                                </div>
                            ))
                        ) : (
                            <div className="border rounded-md p-2 mb-2 bg-transparent">
                                <p>No active travels</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookingVehicle;
