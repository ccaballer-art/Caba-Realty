# Edición de fotos — set de 10 (resumen)

## Entregables
| Carpeta / archivo | Contenido |
|---|---|
| `full/` | JPEG sRGB, calidad 100, 4:4:4, resolución nativa del archivo recibido |
| `web/` | Lado largo ≤ 2048 px, calidad 90 (no se agrandan las fotos más pequeñas) |
| `hoja_comparativa.jpg` | Antes / después de las 10 fotos |
| `verificacion.json` | Parámetros y métricas de cada foto |
| `tools/` | Script reproducible (`batch.py` + `re_edit.py`) |

**Limitación de origen:** se editaron los JPEG del chat, no los HEIC originales (2016×1512; el exterior es un cuadro de video de 2576×1450). No hay gain map HDR en estos archivos. Con los HEIC, el mismo script produce `full` a resolución completa del iPhone.

## Ajustes aplicados (mismos parámetros en todo el set)
- **Balance de blancos:** neutralización del tinte medida en superficies neutras (85%) + leve calidez común.
- **Exposición:** anclada en los blancos (percentil 96 → nivel fijo); los medios solo se levantan si la foto queda oscura (exteriores laterales).
- **Luces:** roll-off suave, sin recorte nuevo en paredes; se recupera lo que el JPEG conserva.
- **Tono:** curva S suave, claridad 0.12 con filtro guiado (respeta bordes) y vibrance 0.14. Suavizado leve de la sobre-nitidez del iPhone.
- **Geometría:** rotación solo si las verticales y el horizonte coinciden. Se aplicó en IMG_7451_still (+1.5°) e IMG_7476 (−1.0°), con un recorte de ~2–4%. La perspectiva (keystone) no se corrigió.
- **Color:** Display P3 → sRGB en punto flotante. El cuadro HLG (HDR) del exterior se decodificó con su modo compatible SDR. Cuantización a 8 bits con dither.
- **Sin IA generativa:** no se quitó, agregó ni reemplazó nada.

## Verificación (las 10 fotos)
- **Contenido idéntico:** similitud estructural (SSIM, tras igualar el tono) de 0.997 a 0.998 en todas las fotos, con la misma composición.
- **Halos:** la desviación local máxima respecto a un ajuste puramente global es ≤ 2.7% (percentil 99.9). No se ven halos en los recortes al 100%.
- **Bandas:** 0 huecos en el histograma en las 10 fotos.
- **Color:** el cambio de croma está entre −4% y +14%. En IMG_7469 sube 24%, porque se quitó el tinte gris y apagado de la luz interior. No hay colores artificiales.
- **Luces:** recorte final ≤ 1.9% en todas las fotos, concentrado en ventanas que ya estaban casi quemadas.

## Problemas de captura que la edición no arregla
| Foto | Problema | ¿Repetir? |
|---|---|---|
| IMG_7479 | Desorden: cajas, silla, mueble y tapa amarilla en primer plano | **Sí, prioridad 1** |
| IMG_7468 / IMG_7469 | Botellas de agua, cable y tapa de microondas en el tope; caja eléctrica sin tapa a la derecha (7468) | **Sí, prioridad 2** (la cocina es la foto clave) |
| IMG_7464 | Manguera en el piso, jardín crecido; es la foto con más luces quemadas (5% del cielo/pared) | **Sí** |
| IMG_7451_still | Es un cuadro de video, no una foto: menos resolución y detalle. Estaba 1.5° torcida; manchas en la acera | **Sí**: foto real, cámara nivelada, a 1x o 0.5x desde más atrás |
| IMG_7476 | Colchón cubierto con plástico negro y zafacón visible | Recomendado |
| IMG_7461 | Wetsuit y toalla colgados en la verja | Recomendado (quitar y repetir) |
| IMG_7475 | Cama sin colchón, almohadas en plástico | Opcional (staging) |
| IMG_7477, IMG_7460 | Sin problemas relevantes | No |

**General:** todas las tomas son ultra gran angular (0.5x) con la cámara inclinada, por eso las verticales convergen (de 6° a 10°). Para la próxima sesión: teléfono nivelado y vertical, a ~1.2–1.4 m de altura (sin apuntar hacia arriba ni hacia abajo), y ventanas con persianas medio abiertas para que no se quemen.
