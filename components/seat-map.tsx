import type { SeatStatus } from '@/types';

interface SeatMapProps {
  seats: SeatStatus[];
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
}

export function SeatMap({ seats, selectedSeats, onSeatSelect }: SeatMapProps) {
  // Generate seat layout (10 rows, 10 seats per row)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 10;

  const getSeatStatus = (seatId: string) => {
    const seat = seats.find(s => s.seatId === seatId);
    if (!seat) return 'available';
    return seat.status;
  };

  const getSeatClass = (seatId: string) => {
    const status = getSeatStatus(seatId);
    const isSelected = selectedSeats.includes(seatId);
    
    if (isSelected) return 'seat seat-selected';
    
    switch (status) {
      case 'booked': return 'seat seat-booked';
      case 'locked': return 'seat seat-locked';
      default: return 'seat seat-available';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Screen */}
      <div className="mb-12 text-center">
        <div className="inline-block bg-gray-300 text-gray-800 px-8 py-2 rounded-full text-sm font-medium mb-2">
          SCREEN
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded"></div>
      </div>

      {/* Seat Grid */}
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-center gap-2">
            {/* Row Label */}
            <div className="w-6 text-center font-medium text-muted-foreground">
              {row}
            </div>
            
            {/* Seats */}
            <div className="flex gap-2">
              {Array.from({ length: seatsPerRow }, (_, i) => {
                const seatNumber = i + 1;
                const seatId = `${row}${seatNumber}`;
                const status = getSeatStatus(seatId);
                const isDisabled = status === 'booked' || status === 'locked';
                
                return (
                  <button
                    key={seatId}
                    className={getSeatClass(seatId)}
                    onClick={() => !isDisabled && onSeatSelect(seatId)}
                    disabled={isDisabled}
                    title={`Seat ${seatId} - ${status}`}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>

            {/* Gap in middle for aisle */}
            {Array.from({ length: 4 }, (_, i) => {
              const seatNumber = seatsPerRow + i + 1;
              const seatId = `${row}${seatNumber}`;
              const status = getSeatStatus(seatId);
              const isDisabled = status === 'booked' || status === 'locked';
              
              return (
                <button
                  key={seatId}
                  className={getSeatClass(seatId)}
                  onClick={() => !isDisabled && onSeatSelect(seatId)}
                  disabled={isDisabled}
                  title={`Seat ${seatId} - ${status}`}
                >
                  {seatNumber}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}