import sharp from 'sharp';
import path from 'path';
import axios from 'axios';
import QRCode from 'qrcode';

export async function createBadge(profileImgUrl: string, badgeName: string, id: string | number): Promise<Buffer> {
  const __dirname = path.resolve();
  const baseCardPath = path.join(__dirname, 'public', 'BaseCard.png');
  const formatedName = formatName(badgeName);
  
  const profileImageBuffer = await axios.get(profileImgUrl, { responseType: 'arraybuffer' }).then(res => Buffer.from(res.data));

  const baseCard = sharp(baseCardPath);
  const baseCardMetadata = await baseCard.metadata();
  if (!baseCardMetadata) {
    throw new Error('Failed to read base card metadata');
  }

  const profileImage = await sharp(profileImageBuffer).toBuffer();
  const compositeImage = await baseCard
    .composite([{
      input: profileImage,
      top: 305,
      left: 195,
      gravity: 'center'
    }])
    .toBuffer();

  const qrCodeBuffer = await QRCode.toBuffer(id.toString(), {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 200,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });

  // Adiciona o QR Code no final da imagem
  const final = await sharp(compositeImage)
    .composite([{
      input: Buffer.from(
        `<svg width="${baseCardMetadata.width}" height="800">
          <text font-family="Arial" x="50%" y="50%" font-size="50" text-anchor="middle" alignment-baseline="middle" fill="black">${formatedName}</text>
        </svg>`
      ),
      gravity: 'south'
    }])
    .toBuffer()

  const finalWithQRCode = await sharp(final)
    .composite([{
      input: qrCodeBuffer,
      top: 900,
      left: 260,
      gravity: 'north',
    }])
    .toBuffer();
  
  return finalWithQRCode;
}

function formatName(name: string) {
  let finalName = name;
  const names = name.split(' ');
  if (names.length > 2) {
    finalName = `${names[0]} ${names[names.length - 1]}`;
    if (finalName.length > 20) {
      finalName = `${names[0]} ${names[names.length - 1].charAt(0)}.`;
    }
  }
  if (finalName.length > 20) {
    finalName = finalName.substring(0, 20);
  }
  return finalName;
}