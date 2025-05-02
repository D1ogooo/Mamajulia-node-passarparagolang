import mongoose from 'mongoose';

const PratosSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredientes: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['em preparo', 'pronto para servico', 'prato servico'],
    default: 'em preparo',
  },
  createdAt: {
    type: Date,
    default: new Intl.DateTimeFormat('pt-BR').format(new Date()),
  }
});

const Pratos = mongoose.model('Pratos', PratosSchema);
export { Pratos }