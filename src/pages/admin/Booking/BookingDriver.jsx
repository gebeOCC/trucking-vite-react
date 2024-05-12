

function BookingDriver({ drivers, form, setForm, formatDate, convertToAMPM }) {
    return(
        <div className="container">
            {drivers.map((driver) => (
                <div key={driver.id} className="border rounded-md p-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">Model: {driver.full_name}</h2>
                    <p
                        className="text-white mb-2 flex justify-between items-center">
                        License Expiry Date: {driver.license_expiry_date}
                        {form.driver_id === driver.id ? (
                            <button
                                className="btn cursor-default text-white border-accent bg-transparent hover:border-accent hover:bg-transparent">
                                Assigned
                            </button>
                        ) : (
                            <button
                                onClick={() => setForm({ ...form, driver_id: driver.id })}
                                className="btn btn-accent">
                                Assign
                            </button>
                        )}

                    </p>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Active travels</h2>
                        {driver.travels.length > 0 ? (
                            driver.travels.map((travel) => (
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
    )
}

export default BookingDriver